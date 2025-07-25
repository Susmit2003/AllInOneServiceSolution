
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'top_up' | 'booking_fee' | 'cancellation_fee' | 'refund';
    amount: number;
    currency: string;
    description: string;
    relatedBookingId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['top_up', 'booking_fee', 'cancellation_fee', 'refund'], required: true },
    amount: { type: Number, required: true }, // Positive for credits, negative for debits
    currency: { type: String, required: true },
    description: { type: String, required: true },
    relatedBookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
}, { timestamps: true });

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
