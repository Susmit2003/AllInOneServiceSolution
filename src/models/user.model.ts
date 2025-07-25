
// import mongoose, { Document, Schema, Model } from 'mongoose';

// export interface IUser extends Document {
//     mobileNumber: string;
//     username: string;
//     fullName?: string;
//     profileImage?: string;
//     address: {
//         line1: string;
//         line2?: string;
//         city: string;
//         pinCode: string;
//         country: string;
//     };
//     currency: string;
//     lastLoginAt?: Date;
//     freeTransactionsUsed: number;
//     dailyBookings: number;
// }

// const UserSchema: Schema<IUser> = new Schema({
//     mobileNumber: { type: String, required: true, unique: true },
//     username: { type: String, required: true, unique: true, trim: true },
//     fullName: { type: String },
//     profileImage: { type: String },
//     address: {
//         line1: { type: String },
//         line2: { type: String },
//         city: { type: String },
//         pinCode: { type: String },
//         country: { type: String },
//     },
//     currency: { type: String, default: 'USD' },
//     lastLoginAt: { type: Date, default: Date.now },
//     freeTransactionsUsed: { type: Number, default: 0 },
//     dailyBookings: { type: Number, default: 0 },
// }, { timestamps: true });

// const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// export default User;




import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    mobileNumber: string;
    username: string;
    fullName?: string;
    profileImage?: string;
    address: {
        line1: string;
        line2?: string;
        city: string;
        pinCode: string;
        country: string;
    };
    currency: string;
    lastLoginAt?: Date;
    monthlyFreeBookings: number; // Changed from freeTransactionsUsed
    dailyBookings: number;
}

const UserSchema: Schema<IUser> = new Schema({
    mobileNumber: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String },
    profileImage: { type: String },
    address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        pinCode: { type: String },
        country: { type: String },
    },
    currency: { type: String, default: 'USD' },
    lastLoginAt: { type: Date, default: Date.now },
    monthlyFreeBookings: { type: Number, default: 10 }, // Providers get 10 free accepted bookings per month
    dailyBookings: { type: Number, default: 0 },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
