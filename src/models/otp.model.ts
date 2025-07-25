
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IOtp extends Document {
    mobileNumber: string;
    otp: string;
    eventType: 'register' | 'login';
    expiresAt: Date;
}

const OtpSchema: Schema<IOtp> = new Schema({
    mobileNumber: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    eventType: { type: String, enum: ['register', 'login'], required: true },
    // This TTL index will automatically delete documents 5 minutes after their creation time.
    // Mongoose uses the `createdAt` timestamp from `timestamps: true` for this.
    createdAt: { type: Date, expires: '5m', default: Date.now }
}, { timestamps: true });

// We need an explicit `expiresAt` field if we want to set a custom expiry,
// but using the built-in `expires` on `createdAt` is simpler for a fixed duration.
// Let's stick with the simpler approach. The schema above is updated.

// Let's go with an explicit expiry for clarity in the verification logic.
const OtpSchemaExplicit: Schema<IOtp> = new Schema({
    mobileNumber: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    eventType: { type: String, enum: ['register', 'login'], required: true },
    expiresAt: { type: Date, required: true }
});

// Create a TTL index on the expiresAt field. Documents will be removed at the time specified in expiresAt.
OtpSchemaExplicit.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>('Otp', OtpSchemaExplicit);

export default Otp;
