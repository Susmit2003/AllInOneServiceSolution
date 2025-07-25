// // 'use server';

// // import { razorpayInstance } from '../razorpay';
// // import dbConnect from '../mongodb';
// // import { getSafeUser } from './user.actions';
// // import PaymentOrder from '@/models/paymentOrder.model';
// // import { z } from 'zod';
// // import { parseJSON } from './utils';
// // import { currencySymbols } from '../constants';

// // const amountSchema = z.number().min(10, "Minimum top-up is 10.").max(1000, "Maximum top-up is 1000.");

// // export async function createRazorpayOrder(amount: number) {
// //     try {
// //         const user = await getSafeUser();
// //         if (!user) {
// //             throw new Error("User not authenticated.");
// //         }

// //         amountSchema.parse(amount);

// //         await dbConnect();
        
// //         const options = {
// //             amount: amount * 100, // amount in the smallest currency unit
// //             currency: user.currency,
// //             receipt: `receipt_order_${new Date().getTime()}`,
// //         };

// //         const order = await razorpayInstance.orders.create(options);
        
// //         const paymentOrder = new PaymentOrder({
// //             userId: user.id,
// //             amount,
// //             currency: user.currency,
// //             razorpayOrderId: order.id,
// //             status: 'created'
// //         });

// //         await paymentOrder.save();

// //         const currencySymbol = currencySymbols[user.currency] || '$';

// //         return {
// //             order: parseJSON(order),
// //             user: {
// //                 name: user.fullName || user.username,
// //                 // Razorpay might not have an email field, using mobile number instead
// //                 contact: user.mobileNumber
// //             },
// //             key: process.env.RAZORPAY_KEY_ID,
// //             displayAmount: `${currencySymbol}${amount}`
// //         };

// //     } catch (error) {
// //         if (error instanceof z.ZodError) {
// //             return { error: error.errors.map(e => e.message).join(', ') };
// //         }
// //         console.error("Razorpay order creation error:", error);
// //         return { error: (error as Error).message || "Could not create payment order." };
// //     }
// // }



// 'use server';

// import { razorpayInstance } from '../razorpay';
// import dbConnect from '../mongodb';
// import { getSafeUser } from './user.actions';
// import PaymentOrder from '@/models/paymentOrder.model';
// import { z } from 'zod';
// import { parseJSON } from './utils';
// import { currencySymbols } from '../constants';

// const amountSchema = z.number().min(1, "Amount must be at least 1.").max(10000, "Maximum amount is 10000.");

// export async function createRazorpayOrder(amount: number, bookingId?: string) {
//     try {
//         const user = await getSafeUser();
//         if (!user) {
//             throw new Error("User not authenticated.");
//         }

//         amountSchema.parse(amount);

//         await dbConnect();
        
//         const options = {
//             amount: amount * 100, // amount in the smallest currency unit
//             currency: user.currency,
//             receipt: `receipt_order_${new Date().getTime()}`,
//             notes: {
//                 userId: user.id,
//                 bookingId: bookingId || null,
//                 type: bookingId ? 'cancellation_fee' : 'wallet_top_up'
//             }
//         };

//         const order = await razorpayInstance.orders.create(options);
        
//         const paymentOrder = new PaymentOrder({
//             userId: user.id,
//             amount,
//             currency: user.currency,
//             razorpayOrderId: order.id,
//             status: 'created',
//             relatedBookingId: bookingId
//         });

//         await paymentOrder.save();

//         const currencySymbol = currencySymbols[user.currency] || '$';

//         return {
//             order: parseJSON(order),
//             user: {
//                 name: user.fullName || user.username,
//                 contact: user.mobileNumber
//             },
//             key: process.env.RAZORPAY_KEY_ID,
//             displayAmount: `${currencySymbol}${amount}`
//         };

//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return { error: error.errors.map(e => e.message).join(', ') };
//         }
//         console.error("Razorpay order creation error:", error);
//         return { error: (error as Error).message || "Could not create payment order." };
//     }
// }



'use server';

import { razorpayInstance } from '@/lib/razorpay';
import dbConnect from '@/lib/mongodb';
import { getSafeUser } from './user.actions';
import PaymentOrder from '@/models/paymentOrder.model';
import { z } from 'zod';
import { parseJSON } from './utils';
import { currencySymbols } from '@/lib/constants';
import crypto from 'crypto';
import Wallet from '@/models/wallet.model';
import Transaction from '@/models/transaction.model';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';

const amountSchema = z.number().min(1, "Amount must be at least 1.").max(10000, "Maximum amount is 10000.");

export async function createRazorpayOrder(amount: number, bookingId?: string) {
    try {
        const user = await getSafeUser();
        if (!user) {
            throw new Error("User not authenticated.");
        }

        amountSchema.parse(amount);

        await dbConnect();
        
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: user.currency,
            receipt: `receipt_order_${new Date().getTime()}`,
            notes: {
                userId: user.id,
                bookingId: bookingId || null,
                type: bookingId ? 'cancellation_fee' : 'wallet_top_up'
            }
        };

        const order = await razorpayInstance.orders.create(options);
        
        const paymentOrder = new PaymentOrder({
            userId: user.id,
            amount,
            currency: user.currency,
            razorpayOrderId: order.id,
            status: 'created',
            relatedBookingId: bookingId
        });

        await paymentOrder.save();

        const currencySymbol = currencySymbols[user.currency] || '$';

        return {
            order: parseJSON(order),
            user: {
                name: user.fullName || user.username,
                contact: user.mobileNumber
            },
            key: process.env.RAZORPAY_KEY_ID,
            displayAmount: `${currencySymbol}${amount}`
        };

    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.errors.map(e => e.message).join(', ') };
        }
        console.error("Razorpay order creation error:", error);
        return { error: (error as Error).message || "Could not create payment order." };
    }
}

/**
 * **NEW FUNCTION**
 * Securely verifies a payment signature from the client and updates the wallet.
 * This removes the race condition with the webhook for immediate UI updates.
 */
export async function verifyTopUpPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
        throw new Error("Razorpay Key Secret is not configured.");
    }

    // This is the crucial step to verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
        return { error: "Invalid payment signature. Payment verification failed." };
    }
    
    // If authentic, proceed to update the database
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const paymentOrder = await PaymentOrder.findOne({ razorpayOrderId: razorpay_order_id }).session(session);
        
        if (!paymentOrder) {
            throw new Error("Payment order not found.");
        }
        if (paymentOrder.status === 'paid') {
            // This payment has already been processed, possibly by a webhook.
            await session.commitTransaction();
            return { success: true, message: "Payment already processed." };
        }

        paymentOrder.status = 'paid';
        paymentOrder.razorpayPaymentId = razorpay_payment_id;
        paymentOrder.razorpaySignature = razorpay_signature;
        await paymentOrder.save({ session });

        const wallet = await Wallet.findOne({ userId: paymentOrder.userId }).session(session);
        if (!wallet) {
            throw new Error(`Wallet not found for user ID: ${paymentOrder.userId}`);
        }

        wallet.balance += paymentOrder.amount;
        await wallet.save({ session });

        await new Transaction({
            userId: paymentOrder.userId,
            type: 'top_up',
            amount: paymentOrder.amount,
            currency: wallet.currency,
            description: `Wallet topped up. Order: ${razorpay_order_id.slice(-6)}`,
        }).save({ session });

        await session.commitTransaction();
        
        revalidatePath('/wallet'); // Revalidate the wallet page data

        return { success: true };

    } catch (error) {
        await session.abortTransaction();
        console.error("Error in verifyTopUpPayment:", error);
        return { error: (error as Error).message || "Failed to update wallet after payment." };
    } finally {
        session.endSession();
    }
}
