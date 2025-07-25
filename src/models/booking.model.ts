
// import mongoose, { Document, Schema, Model } from 'mongoose';

// export interface IBooking extends Document {
//     serviceId: mongoose.Types.ObjectId;
//     serviceTitle: string;
//     providerId: mongoose.Types.ObjectId;
//     providerName: string;
//     bookedByUserId: mongoose.Types.ObjectId;
//     bookedByUserName: string;
//     serviceDate: Date;
//     timeSlot: string;
//     address: {
//         line1: string;
//         line2?: string;
//         city: string;
//         pinCode: string;
//         country: string;
//     };
//     status: "Requested" | "Accepted" | "InProgress" | "Completed" | "Cancelled" | "Incompleted";
//     paymentStatus: "pending" | "free" | "fee_paid" | "failed";
//     bookerFeePaid: number;
//     providerFeePaid: number;
//     currency: string;
    
//     idempotencyKey?: string;
    
//     // New fields for verification and two-way feedback
//     serviceVerificationCode: string;
//     serviceVerified: boolean;
//     serviceVerifiedAt?: Date;

//     userFeedback?: {
//         stars: number;
//         text?: string;
//     };
//     providerFeedback?: {
//         stars: number;
//         text?: string;
//     };

//     // Timestamps for status changes
//     requestedAt: Date;
//     acceptedAt?: Date;
//     inProgressAt?: Date;
//     completedAt?: Date;
//     cancelledAt?: Date;
//     cancelledBy?: 'user' | 'provider';
//     incompletedAt?: Date;
// }

// const BookingSchema: Schema<IBooking> = new Schema({
//     serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
//     serviceTitle: { type: String, required: true },
//     providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     providerName: { type: String, required: true },
//     bookedByUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     bookedByUserName: { type: String, required: true },
//     serviceDate: { type: Date, required: true },
//     timeSlot: { type: String, required: true },
//     address: {
//         line1: { type: String, required: true },
//         line2: String,
//         city: { type: String, required: true },
//         pinCode: { type: String, required: true },
//         country: { type: String, required: true },
//     },
//     status: { type: String, enum: ["Requested", "Accepted", "InProgress", "Completed", "Cancelled", "Incompleted"], default: "Requested" },
//     paymentStatus: { type: String, enum: ["pending", "free", "fee_paid", "failed"], default: "pending" },
//     bookerFeePaid: { type: Number, default: 0 },
//     providerFeePaid: { type: Number, default: 0 },
//     currency: { type: String, required: true },
    
//     idempotencyKey: { type: String, unique: true, sparse: true },

//     serviceVerificationCode: { type: String, required: true },
//     serviceVerified: { type: Boolean, default: false },
//     serviceVerifiedAt: { type: Date },

//     userFeedback: {
//         stars: Number,
//         text: String,
//     },
//     providerFeedback: {
//         stars: Number,
//         text: String,
//     },
    
//     requestedAt: { type: Date, required: true },
//     acceptedAt: { type: Date },
//     inProgressAt: { type: Date },
//     completedAt: { type: Date },
//     cancelledAt: { type: Date },
//     cancelledBy: { type: String, enum: ['user', 'provider'] },
//     incompletedAt: { type: Date },
// }, { timestamps: true });

// BookingSchema.index({ serviceId: 1, serviceDate: 1, timeSlot: 1 }, { unique: false });


// const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

// export default Booking;



import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// The IBooking interface now extends Mongoose's Document type
// and explicitly defines the properties Mongoose adds.
export interface IBooking extends Document {
    _id: Types.ObjectId; // Explicitly define _id
    serviceId: Types.ObjectId;
    serviceTitle: string;
    providerId: Types.ObjectId;
    providerName: string;
    bookedByUserId: Types.ObjectId;
    bookedByUserName: string;
    serviceDate: Date;
    timeSlot: string;
    address: {
        line1: string;
        line2?: string;
        city: string;
        pinCode: string;
        country: string;
    };
    status: "Requested" | "Accepted" | "InProgress" | "Completed" | "Cancelled" | "Incompleted";
    paymentStatus: "pending" | "free" | "fee_paid" | "failed";
    bookerFeePaid: number;
    providerFeePaid: number;
    servicePrice: number; // Price of the service at the time of booking
    currency: string;
    
    idempotencyKey?: string;
    
    serviceVerificationCode: string;
    serviceVerified: boolean;
    serviceVerifiedAt?: Date;

    userFeedback?: {
        stars: number;
        text?: string;
    };
    providerFeedback?: {
        stars: number;
        text?: string;
    };

    requestedAt: Date;
    acceptedAt?: Date;
    inProgressAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
    cancelledBy?: 'user' | 'provider';
    incompletedAt?: Date;
    createdAt: Date; // Explicitly define createdAt
    updatedAt: Date; // Explicitly define updatedAt
}

const BookingSchema: Schema<IBooking> = new Schema({
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    serviceTitle: { type: String, required: true },
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerName: { type: String, required: true },
    bookedByUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookedByUserName: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    address: {
        line1: { type: String, required: true },
        line2: String,
        city: { type: String, required: true },
        pinCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    status: { type: String, enum: ["Requested", "Accepted", "InProgress", "Completed", "Cancelled", "Incompleted"], default: "Requested" },
    paymentStatus: { type: String, enum: ["pending", "free", "fee_paid", "failed"], default: "pending" },
    bookerFeePaid: { type: Number, default: 0 },
    providerFeePaid: { type: Number, default: 0 },
    servicePrice: { type: Number, required: true },
    currency: { type: String, required: true },
    
    idempotencyKey: { type: String, unique: true, sparse: true },

    serviceVerificationCode: { type: String, required: true },
    serviceVerified: { type: Boolean, default: false },
    serviceVerifiedAt: { type: Date },

    userFeedback: {
        stars: Number,
        text: String,
    },
    providerFeedback: {
        stars: Number,
        text: String,
    },
    
    requestedAt: { type: Date, required: true },
    acceptedAt: { type: Date },
    inProgressAt: { type: Date },
    completedAt: { type: Date },
    cancelledAt: { type: Date },
    cancelledBy: { type: String, enum: ['user', 'provider'] },
    incompletedAt: { type: Date },
}, { timestamps: true });

BookingSchema.index({ serviceId: 1, serviceDate: 1, timeSlot: 1 }, { unique: false });


const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
