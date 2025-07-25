'use server';

import dbConnect from '@/lib/mongodb';
import Booking from '@/models/booking.model';
import User from '@/models/user.model';
import Wallet from '@/models/wallet.model';
import Service from '@/models/service.model';
import Transaction from '@/models/transaction.model';
import { revalidatePath } from 'next/cache';
import { parseJSON } from './utils';
import { getSafeUser } from './user.actions';
import { createBookingSchema, CreateBookingParams } from '../validations';
import { z } from 'zod';
import mongoose from 'mongoose';
import { 
    PROVIDER_PLATFORM_FEE_PERCENTAGE, 
    MONTHLY_FREE_BOOKINGS,
    CUSTOMER_CANCELLATION_FEE,
    CANCELLATION_FEE_TO_PROVIDER,
    CANCELLATION_FEE_TO_PLATFORM
} from '../constants';
import { createNotification } from './notification.actions';

const MAX_DAILY_BOOKINGS = 10;

// Helper to extract number from a price string like "$50/hr" or "From ₹120"
const parsePrice = (priceDisplay: string): number => {
    if (!priceDisplay) return 0;
    const numbers = priceDisplay.match(/\d+(\.\d+)?/g);
    return numbers ? parseFloat(numbers[0]) : 0;
};

export async function createBooking(params: CreateBookingParams) {
    await dbConnect();
    const validatedParams = createBookingSchema.safeParse(params);
    if (!validatedParams.success) {
        return { error: validatedParams.error.errors.map(e => e.message).join(', ') };
    }
    const { providerId, serviceId, timeSlot, address, idempotencyKey, serviceDate, servicePrice } = validatedParams.data;

    const existingBookingByIdempotency = await Booking.findOne({ idempotencyKey });
    if (existingBookingByIdempotency) {
        console.log(`Idempotent request for key ${idempotencyKey}: returning existing booking.`);
        return parseJSON(existingBookingByIdempotency);
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const booker = await User.findById(validatedParams.data.bookedByUserId).session(session);
        if (!booker) {
            throw new Error('You must be logged in to create a booking.');
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const bookingsToday = await Booking.countDocuments({ bookedByUserId: booker._id, createdAt: { $gte: today } }).session(session);
        if (bookingsToday >= MAX_DAILY_BOOKINGS) {
            throw new Error(`You have reached the daily booking limit of ${MAX_DAILY_BOOKINGS}.`);
        }
        
        const existingBookingOnSlot = await Booking.findOne({
            serviceId,
            serviceDate,
            timeSlot,
            status: { $in: ['Requested', 'Accepted', 'InProgress'] }
        }).session(session);

        if (existingBookingOnSlot) {
            throw new Error('This time slot is already booked for the selected date. Please choose another.');
        }

        const service = await Service.findById(serviceId).session(session);
        if (!service) throw new Error('Service not found.');

        const provider = await User.findById(providerId).session(session);
        if (!provider) throw new Error('Service provider not found.');
        
        booker.dailyBookings = (booker.dailyBookings || 0) + 1;
        await booker.save({ session });
        
        const serviceVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newBooking = new Booking({
            serviceId,
            serviceTitle: service.title,
            providerId,
            providerName: provider.fullName || provider.username,
            bookedByUserId: booker._id,
            bookedByUserName: booker.fullName || booker.username,
            serviceDate,
            timeSlot,
            address,
            status: 'Requested',
            paymentStatus: 'pending',
            currency: booker.currency,
            servicePrice: servicePrice,
            requestedAt: new Date(),
            serviceVerificationCode,
            idempotencyKey,
        });
        
        await newBooking.save({ session });
        
        await createNotification({
            userId: providerId.toString(),
            title: "New Booking Request",
            message: `You have a new request for "${service.title}" from ${booker.fullName || booker.username}.`,
            link: '/dashboard/provider-schedule',
            relatedBookingId: newBooking._id.toString()
        });

        await session.commitTransaction();

        revalidatePath('/bookings');
        revalidatePath(`/all-services/${serviceId}/book`);
        revalidatePath('/dashboard/provider-schedule');
        
        return parseJSON(newBooking);

    } catch (error) {
        await session.abortTransaction();
        if (error instanceof z.ZodError) {
            return { error: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { error: (error as Error).message || 'Failed to create booking due to a server error.' };
    } finally {
        session.endSession();
    }
}


export async function acceptBooking(bookingId: string) {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const safeUser = await getSafeUser();
        if (!safeUser) throw new Error('Provider not authenticated.');
        
        const provider = await User.findById(safeUser.id).session(session);
        if (!provider) throw new Error('Provider not found.');

        const booking = await Booking.findById(bookingId).session(session);
        if (!booking || booking.providerId.toString() !== provider.id.toString()) {
            throw new Error('Booking not found or not authorized.');
        }
        if (booking.status !== 'Requested') {
            throw new Error('Booking is not in a requested state.');
        }
        
        const service = await Service.findById(booking.serviceId).session(session);
        if (!service) throw new Error('Associated service not found.');

        // **FIX & DEBUG:** Handle legacy services that may not have the numeric `price` field.
        console.log(`Checking service "${service.title}". Original price:`, service.price);
        if (typeof service.price !== 'number' || !isFinite(service.price)) {
            console.log(`Price is missing or invalid. Parsing from display: "${service.priceDisplay}"`);
            service.price = parsePrice(service.priceDisplay);
            console.log(`New parsed price:`, service.price);
        }
        const servicePrice = service.price;
        if (servicePrice <= 0) {
            throw new Error('Invalid service price. Cannot accept booking.');
        }

        const providerWallet = await Wallet.findOne({ userId: provider._id }).session(session);
        if (!providerWallet) throw new Error('Provider wallet not found.');

        const isFreeBooking = provider.monthlyFreeBookings > 0;
        let platformFee = 0;

        if (!isFreeBooking) {
            platformFee = servicePrice * PROVIDER_PLATFORM_FEE_PERCENTAGE;
            const requiredBalance = servicePrice * 0.10;
            if (providerWallet.balance < requiredBalance) {
                throw new Error(`Insufficient balance. You need at least ${requiredBalance.toFixed(2)} ${provider.currency} to accept this booking. Please top up your wallet.`);
            }
            providerWallet.balance -= platformFee;
            await providerWallet.save({ session });

            await new Transaction({
                userId: provider._id,
                type: 'booking_fee',
                amount: -platformFee,
                currency: provider.currency,
                description: `Platform fee for: ${booking.serviceTitle.substring(0, 20)}...`,
                relatedBookingId: booking._id
            }).save({ session });
        } else {
            provider.monthlyFreeBookings -= 1;
            await provider.save({ session });
        }
        
        service.totalBookings = (service.totalBookings || 0) + 1;
        await service.save({ session }); // Now this will pass validation

        booking.status = 'Accepted';
        booking.acceptedAt = new Date();
        booking.providerFeePaid = platformFee;
        booking.paymentStatus = isFreeBooking ? 'free' : 'fee_paid';
        
        await booking.save({ session });

        await createNotification({
            userId: booking.bookedByUserId.toString(),
            title: "Booking Accepted!",
            message: `Your booking for "${booking.serviceTitle}" has been accepted by ${provider.fullName || provider.username}.`,
            link: `/bookings`,
            relatedBookingId: booking._id.toString()
        });

        await session.commitTransaction();

        revalidatePath('/dashboard/provider-schedule');
        revalidatePath('/bookings');
        revalidatePath('/wallet');

        return parseJSON(booking);
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return { error: (error as Error).message || 'Failed to accept booking.' };
    } finally {
        session.endSession();
    }
}

export async function cancelBookingAsUser(bookingId: string, paymentCaptured: boolean = false) {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const currentUser = await getSafeUser();
        if (!currentUser) throw new Error('You must be logged in.');

        const booking = await Booking.findById(bookingId).session(session);
        if (!booking || booking.bookedByUserId.toString() !== currentUser.id) {
            throw new Error('Booking not found or you are not authorized.');
        }
        
        if (booking.status !== 'Accepted') {
            throw new Error(`Cannot cancel a booking with status: ${booking.status}`);
        }

        if (!paymentCaptured) {
            throw new Error('Cancellation fee payment is required to cancel this booking.');
        }

        const providerWallet = await Wallet.findOne({ userId: booking.providerId }).session(session);
        if (providerWallet) {
            providerWallet.balance += CANCELLATION_FEE_TO_PROVIDER;
            await providerWallet.save({ session });

            await new Transaction({
                userId: booking.providerId,
                type: 'refund',
                amount: CANCELLATION_FEE_TO_PROVIDER,
                currency: booking.currency,
                description: `User cancellation payout for: ${booking.serviceTitle.substring(0, 20)}...`,
                relatedBookingId: booking._id
            }).save({ session });
        }

        await new Transaction({
            userId: currentUser.id,
            type: 'cancellation_fee',
            amount: -CUSTOMER_CANCELLATION_FEE,
            currency: booking.currency,
            description: `Cancellation fee for: ${booking.serviceTitle.substring(0, 20)}...`,
            relatedBookingId: booking._id
        }).save({ session });


        booking.status = 'Cancelled';
        booking.cancelledAt = new Date();
        booking.cancelledBy = 'user';
        
        await booking.save({ session });

        await createNotification({ 
            userId: booking.providerId.toString(), 
            title: "Booking Cancelled", 
            message: `${currentUser.fullName || currentUser.username} has cancelled the booking for "${booking.serviceTitle}".`, 
            link: '/dashboard/provider-schedule', 
            relatedBookingId: booking._id.toString() 
        });

        await session.commitTransaction();
        
        revalidatePath('/bookings');
        revalidatePath('/wallet');
        revalidatePath('/dashboard/provider-schedule');
        
        return parseJSON(booking);
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return { error: (error as Error).message || 'Failed to cancel booking.' };
    } finally {
        session.endSession();
    }
}

export async function declineBooking(bookingId: string) {
    await dbConnect();
    try {
        const provider = await getSafeUser();
        if (!provider) throw new Error('Provider not authenticated.');

        const updatedBooking = await Booking.findOneAndUpdate(
            { _id: bookingId, providerId: provider.id, status: 'Requested' },
            { 
                $set: { 
                    status: 'Cancelled',
                    cancelledBy: 'provider',
                    cancelledAt: new Date()
                }
            },
            { new: true }
        );

        if (!updatedBooking) {
            throw new Error('Booking could not be declined. It might have been already handled or does not exist.');
        }

        await createNotification({
            userId: updatedBooking.bookedByUserId.toString(),
            title: "Booking Declined",
            message: `Your request for "${updatedBooking.serviceTitle}" has been declined by the provider.`,
            link: `/bookings`,
            relatedBookingId: updatedBooking._id.toString()
        });
        
        revalidatePath('/dashboard/provider-schedule');
        revalidatePath('/bookings');

        return parseJSON(updatedBooking);
    } catch (error) {
        console.error(error);
        return { error: (error as Error).message || 'Failed to decline booking.' };
    }
}

export async function getUserBookings() {
    try {
        const user = await getSafeUser();
        if (!user) {
            return [];
        }

        await dbConnect();
        const bookings = await Booking.find({ bookedByUserId: user.id }).sort({ createdAt: -1 });
        return parseJSON(bookings);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProviderBookings() {
    try {
        const user = await getSafeUser();
        if (!user) {
            return [];
        }

        await dbConnect();
        const bookings = await Booking.find({ providerId: user.id }).sort({ createdAt: -1 });
        return parseJSON(bookings);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addReview({ bookingId, rating, reviewText }: { bookingId: string, rating: number, reviewText?: string }) {
    await dbConnect();
    try {
        const user = await getSafeUser();
        if (!user) throw new Error('You must be logged in to add a review.');

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.bookedByUserId.toString() !== user.id) {
            throw new Error('Booking not found or you are not authorized to review it.');
        }

        if (booking.status !== 'Completed' && booking.status !== 'Incompleted') {
            throw new Error('You can only review services that have been marked as completed or incomplete by the provider.');
        }
        
        booking.userFeedback = { stars: rating, text: reviewText };
        await booking.save();

        const service = await Service.findById(booking.serviceId);
        if (service) {
            const allBookingsForService = await Booking.find({ serviceId: booking.serviceId, "userFeedback.stars": { $exists: true } });
            const totalReviews = allBookingsForService.length;
            const ratingSum = allBookingsForService.reduce((sum, b) => sum + (b.userFeedback?.stars || 0), 0);
            service.ratingAvg = totalReviews > 0 ? ratingSum / totalReviews : 0;
            service.totalReviews = totalReviews;
            await service.save();
        }
        
        revalidatePath('/bookings');
        revalidatePath(`/all-services/${booking.serviceId}/book`);
        
        return parseJSON(booking);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to add review.');
    }
}

export async function addProviderFeedback({ bookingId, rating, reviewText }: { bookingId: string, rating: number, reviewText?: string }) {
    await dbConnect();
    try {
        const provider = await getSafeUser();
        if (!provider) throw new Error('You must be logged in as a provider.');

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.providerId.toString() !== provider.id) {
            throw new Error('Booking not found or you are not authorized to review it.');
        }

        if (booking.status !== 'Completed') {
            throw new Error('You can only review bookings that have been completed.');
        }
        
        booking.providerFeedback = { stars: rating, text: reviewText };
        await booking.save();
        
        revalidatePath('/dashboard/provider-schedule');
        
        return parseJSON(booking);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to add feedback.');
    }
}

export async function verifyAndStartService({ bookingId, verificationCode }: { bookingId: string, verificationCode: string }) {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const provider = await getSafeUser();
        if (!provider) {
            throw new Error('You must be logged in as a provider.');
        }
        
        const pendingFeedbackBookings = await Booking.findOne({
            providerId: provider.id,
            status: 'Completed',
            providerFeedback: { $exists: false }
        }).session(session);

        if (pendingFeedbackBookings) {
            throw new Error(`You cannot start a new service. Please provide feedback for booking: "${pendingFeedbackBookings.serviceTitle}"`);
        }

        const booking = await Booking.findById(bookingId).session(session);

        if (!booking || booking.providerId.toString() !== provider.id) {
            throw new Error('Booking not found or you are not authorized.');
        }

        if (booking.status !== 'Accepted') {
            throw new Error(`Cannot start a service with status: ${booking.status}`);
        }

        if (booking.serviceVerificationCode !== verificationCode) {
            throw new Error('Incorrect service verification code.');
        }

        booking.status = 'InProgress';
        booking.serviceVerified = true;
        booking.inProgressAt = new Date();
        booking.serviceVerifiedAt = new Date();

        await booking.save({ session });

        await createNotification({
            userId: booking.bookedByUserId.toString(),
            title: "Service In Progress",
            message: `Your service "${booking.serviceTitle}" has started!`,
            link: '/bookings',
            relatedBookingId: booking._id.toString()
        });

        await session.commitTransaction();

        revalidatePath('/bookings');
        revalidatePath('/dashboard/provider-schedule');

        return parseJSON(booking);

    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return { error: (error as Error).message || 'Failed to start service.' };
    } finally {
        session.endSession();
    }
}

export async function markAsIncomplete(bookingId: string) {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const provider = await getSafeUser();
        if (!provider) throw new Error('You must be logged in as a provider.');

        const booking = await Booking.findOne({ _id: bookingId, providerId: provider.id }).session(session);
        if (!booking) throw new Error('Booking not found or you are not the provider.');

        if (booking.status !== 'InProgress') {
            throw new Error('Service must be In Progress to be marked as incomplete.');
        }

        if (booking.bookerFeePaid > 0) {
            const bookerWallet = await Wallet.findOne({ userId: booking.bookedByUserId }).session(session);
            if (bookerWallet) {
                bookerWallet.balance += booking.bookerFeePaid;
                await bookerWallet.save({ session });
                await new Transaction({
                    userId: booking.bookedByUserId,
                    type: 'refund',
                    amount: booking.bookerFeePaid,
                    currency: booking.currency,
                    description: `Refund for incomplete service: ${booking.serviceTitle.substring(0, 20)}...`,
                    relatedBookingId: booking._id
                }).save({ session });
            }
        }

        booking.status = 'Incompleted';
        booking.incompletedAt = new Date();

        await booking.save({ session });

        await createNotification({
            userId: booking.bookedByUserId.toString(),
            title: "Service Incomplete",
            message: `Your service "${booking.serviceTitle}" was marked incomplete by the provider. Your fee has been refunded.`,
            link: '/bookings',
            relatedBookingId: booking._id.toString()
        });

        await session.commitTransaction();

        revalidatePath('/bookings');
        revalidatePath('/wallet');
        revalidatePath('/dashboard/provider-schedule');

        return parseJSON(booking);

    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return { error: (error as Error).message || 'Failed to mark service as incomplete.' };
    } finally {
        session.endSession();
    }
}

export async function completeService(bookingId: string) {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const provider = await getSafeUser();
        if (!provider) throw new Error('You must be logged in as a provider.');

        const booking = await Booking.findOne({ _id: bookingId, providerId: provider.id }).session(session);
        if (!booking) throw new Error('Booking not found or you are not the provider.');

        if (booking.status !== 'InProgress') {
            throw new Error('Service must be In Progress to be marked as complete.');
        }

        booking.status = 'Completed';
        booking.completedAt = new Date();

        await booking.save({ session });

        await createNotification({
            userId: booking.bookedByUserId.toString(),
            title: "Service Completed",
            message: `Your service "${booking.serviceTitle}" is complete. Please leave a review!`,
            link: '/bookings',
            relatedBookingId: booking._id.toString()
        });
        
        await session.commitTransaction();

        revalidatePath('/bookings');
        revalidatePath('/dashboard/provider-schedule');

        return parseJSON(booking);

    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return { error: (error as Error).message || 'Failed to complete service.' };
    } finally {
        session.endSession();
    }
}

export async function getUnavailableSlots(serviceId: string, date: Date): Promise<string[]> {
    try {
        await dbConnect();

        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const bookings = await Booking.find({
            serviceId,
            serviceDate: { $gte: startOfDay, $lte: endOfDay },
            status: { $in: ['Requested', 'Accepted', 'InProgress'] }
        });
        
        const unavailableSlots = bookings.map(b => b.timeSlot);
        return parseJSON(unavailableSlots);
    } catch (error) {
        console.error('Error fetching unavailable slots:', error);
        return [];
    }
}
