// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';
// import dbConnect from '@/lib/mongodb';
// import PaymentOrder from '@/models/paymentOrder.model';
// import Wallet from '@/models/wallet.model';
// import Transaction from '@/models/transaction.model';
// import mongoose from 'mongoose';

// const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

// export async function POST(req: NextRequest) {
//     if (!webhookSecret) {
//         console.error("Razorpay webhook secret is not set.");
//         return NextResponse.json({ error: 'Internal server configuration error' }, { status: 500 });
//     }

//     const body = await req.text();
//     const signature = req.headers.get('x-razorpay-signature');

//     if (!signature) {
//         return NextResponse.json({ error: 'Signature missing' }, { status: 400 });
//     }

//     try {
//         const shasum = crypto.createHmac('sha256', webhookSecret);
//         shasum.update(body);
//         const digest = shasum.digest('hex');

//         if (digest !== signature) {
//             return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
//         }

//         const data = JSON.parse(body);
//         const event = data.event;

//         if (event === 'payment.captured') {
//             const paymentEntity = data.payload.payment.entity;
//             const orderId = paymentEntity.order_id;
//             const amount = paymentEntity.amount / 100; // convert from paisa/cents to currency unit

//             await dbConnect();
            
//             const session = await mongoose.startSession();
//             session.startTransaction();

//             try {
//                 const paymentOrder = await PaymentOrder.findOne({ razorpayOrderId: orderId }).session(session);

//                 if (!paymentOrder) {
//                     throw new Error(`PaymentOrder not found for Razorpay order ID: ${orderId}`);
//                 }
                
//                 // Idempotency check
//                 if (paymentOrder.status === 'paid') {
//                     console.log(`Order ${orderId} already processed.`);
//                     await session.commitTransaction();
//                     return NextResponse.json({ status: 'ok' });
//                 }

//                 paymentOrder.status = 'paid';
//                 paymentOrder.razorpayPaymentId = paymentEntity.id;
//                 paymentOrder.razorpaySignature = signature;
//                 await paymentOrder.save({ session });

//                 const wallet = await Wallet.findOne({ userId: paymentOrder.userId }).session(session);
//                 if (!wallet) {
//                     throw new Error(`Wallet not found for user ID: ${paymentOrder.userId}`);
//                 }

//                 wallet.balance += amount;
//                 await wallet.save({ session });

//                 await new Transaction({
//                     userId: paymentOrder.userId,
//                     type: 'top_up',
//                     amount: amount,
//                     currency: wallet.currency,
//                     description: `Wallet topped up via Razorpay. Order ID: ${orderId.slice(-6)}`,
//                 }).save({ session });

//                 await session.commitTransaction();
                
//             } catch (error) {
//                 await session.abortTransaction();
//                 console.error("Error processing Razorpay webhook:", error);
//                 // Don't send a 500 to Razorpay, it will keep retrying. 
//                 // Log it and investigate. A 200 signals we've received it.
//             } finally {
//                 session.endSession();
//             }
//         }
        
//         return NextResponse.json({ status: 'ok' });

//     } catch (error) {
//         console.error("Webhook processing error:", error);
//         return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
//     }
// }



import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import PaymentOrder from '@/models/paymentOrder.model';
import Wallet from '@/models/wallet.model';
import Transaction from '@/models/transaction.model';
import mongoose from 'mongoose';
import { cancelBookingAsUser } from '@/lib/actions/booking.actions'; // Import cancellation action

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    if (!webhookSecret) {
        console.error("Razorpay webhook secret is not set.");
        return NextResponse.json({ error: 'Internal server configuration error' }, { status: 500 });
    }

    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Signature missing' }, { status: 400 });
    }

    try {
        const shasum = crypto.createHmac('sha256', webhookSecret);
        shasum.update(body);
        const digest = shasum.digest('hex');

        if (digest !== signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const data = JSON.parse(body);
        const event = data.event;

        if (event === 'payment.captured') {
            const paymentEntity = data.payload.payment.entity;
            const orderId = paymentEntity.order_id;
            const amount = paymentEntity.amount / 100;

            await dbConnect();
            
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                const paymentOrder = await PaymentOrder.findOne({ razorpayOrderId: orderId }).session(session);
                if (!paymentOrder || paymentOrder.status === 'paid') {
                    await session.commitTransaction();
                    return NextResponse.json({ status: 'ok' });
                }

                paymentOrder.status = 'paid';
                paymentOrder.razorpayPaymentId = paymentEntity.id;
                paymentOrder.razorpaySignature = signature;
                await paymentOrder.save({ session });
                
                const orderType = paymentEntity.notes?.type || 'wallet_top_up';

                if (orderType === 'wallet_top_up') {
                    const wallet = await Wallet.findOne({ userId: paymentOrder.userId }).session(session);
                    if (!wallet) throw new Error(`Wallet not found for user ID: ${paymentOrder.userId}`);

                    wallet.balance += amount;
                    await wallet.save({ session });

                    await new Transaction({
                        userId: paymentOrder.userId,
                        type: 'top_up',
                        amount: amount,
                        currency: wallet.currency,
                        description: `Wallet topped up via Razorpay. Order ID: ${orderId.slice(-6)}`,
                    }).save({ session });
                } else if (orderType === 'cancellation_fee' && paymentEntity.notes.bookingId) {
                    // Payment was for a cancellation, now trigger the cancellation logic
                    await cancelBookingAsUser(paymentEntity.notes.bookingId, true);
                }

                await session.commitTransaction();
                
            } catch (error) {
                await session.abortTransaction();
                console.error("Error processing Razorpay webhook:", error);
            } finally {
                session.endSession();
            }
        }
        
        return NextResponse.json({ status: 'ok' });

    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
