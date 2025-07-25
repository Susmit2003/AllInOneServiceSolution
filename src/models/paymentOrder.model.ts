import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPaymentOrder extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    razorpayOrderId: string;
    status: 'created' | 'paid' | 'failed';
    razorpayPaymentId?: string;
    razorpaySignature?: string;
}

const PaymentOrderSchema: Schema<IPaymentOrder> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
}, { timestamps: true });

PaymentOrderSchema.index({ razorpayOrderId: 1 });

const PaymentOrder: Model<IPaymentOrder> = mongoose.models.PaymentOrder || mongoose.model<IPaymentOrder>('PaymentOrder', PaymentOrderSchema);

export default PaymentOrder;
