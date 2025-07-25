
import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface INotification extends Document {
    _id: Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    message: string;
    isRead: boolean;
    link?: string;
    relatedBookingId?: mongoose.Types.ObjectId;
    createdAt: Date; // Explicitly adding for clarity, though Document includes it
    updatedAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: { type: String },
    relatedBookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
}, { timestamps: true });

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
