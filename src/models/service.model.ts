
// import mongoose, { Document, Schema, Model } from 'mongoose';

// export interface IService extends Document {
//     userId: mongoose.Types.ObjectId;
//     providerName: string;
//     title: string;
//     category: string;
//     subCategory?: string;
//     description: string;
//     images: string[];
//     timeSlots: string[];
//     zipCodes: string[];
//     ratingAvg: number;
//     totalReviews: number;
//     priceDisplay: string;
//     totalBookings: number;
//     status: 'Active' | 'Inactive' | 'Archived';
//     isActive: boolean;
// }

// const ServiceSchema: Schema<IService> = new Schema({
//     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     providerName: { type: String, required: true },
//     title: { type: String, required: true, trim: true },
//     category: { type: String, required: true },
//     subCategory: { type: String },
//     description: { type: String, required: true },
//     images: [{ type: String }],
//     timeSlots: [{ type: String }],
//     zipCodes: [{ type: String }],
//     ratingAvg: { type: Number, default: 0 },
//     totalReviews: { type: Number, default: 0 },
//     priceDisplay: { type: String, required: true },
//     totalBookings: { type: Number, default: 0 },
//     status: { type: String, enum: ['Active', 'Inactive', 'Archived'], default: 'Active' },
//     isActive: { type: Boolean, default: true },
// }, { timestamps: true });

// ServiceSchema.index({ title: 'text', description: 'text', category: 'text' });

// const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

// export default Service;



import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IService extends Document {
    userId: mongoose.Types.ObjectId;
    providerName: string;
    title: string;
    category: string;
    subCategory?: string;
    description: string;
    images: string[];
    timeSlots: string[];
    zipCodes: string[];
    ratingAvg: number;
    totalReviews: number;
    price: number; // Storing the numeric price for calculations
    priceDisplay: string; // Keeping the display string for flexibility
    totalBookings: number;
    status: 'Active' | 'Inactive' | 'Archived';
    isActive: boolean;
}

const ServiceSchema: Schema<IService> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerName: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    description: { type: String, required: true },
    images: [{ type: String }],
    timeSlots: [{ type: String }],
    zipCodes: [{ type: String }],
    ratingAvg: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    priceDisplay: { type: String, required: true },
    totalBookings: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive', 'Archived'], default: 'Active' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

ServiceSchema.index({ title: 'text', description: 'text', category: 'text' });

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
