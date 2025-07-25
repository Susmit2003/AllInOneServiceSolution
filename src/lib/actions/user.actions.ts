
'use server';

import dbConnect from '@/lib/mongodb';
import User from '@/models/user.model';
import Otp from '@/models/otp.model';
import Wallet from '@/models/wallet.model';
import Transaction from '@/models/transaction.model';
import { revalidatePath } from 'next/cache';
import { parseJSON } from './utils';
import { getTokenPayload, setTokenCookie, clearTokenCookie } from '../auth';
import twilioClient, { twilioPhoneNumber } from '../twilio';
import { countries } from '@/lib/constants';
import { updateUserProfileSchema, UpdateUserProfileParams } from '../validations';
import { z } from 'zod';
import mongoose from 'mongoose';

export async function getSafeUser() {
    try {
        const payload = await getTokenPayload();
        if (!payload?.userId) return null;
        
        await dbConnect();
        const user = await User.findById(payload.userId);
        if (!user) return null;

        const wallet = await Wallet.findOne({ userId: user._id });

        const userObject = parseJSON(user);
        // Manually attach walletBalance to the returned object
        userObject.walletBalance = wallet ? wallet.balance : 0;

        return userObject;
    } catch (error) {
        return null;
    }
}

export async function checkUsernameAvailability(username: string) {
    try {
        const payload = await getTokenPayload();
        if (!payload?.userId) {
            return { available: false, error: 'User not authenticated' };
        }
        await dbConnect();
        
        // Case-insensitive search
        const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
        
        if (existingUser && existingUser._id.toString() !== payload.userId) {
            return { available: false };
        }
        
        return { available: true };

    } catch (error) {
        console.error(error);
        return { available: false, error: 'Server error' };
    }
}

export async function sendOtp(mobileNumber: string) {
    try {
        if (!twilioPhoneNumber || twilioPhoneNumber.includes('<YOUR_TWILIO_PHONE_NUMBER>')) {
            // This check is a safeguard. The primary check is now in twilio.ts
            return { error: 'Twilio Phone Number is not configured. Please set it in your .env.local file.' };
        }
        await dbConnect();

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

        const existingUser = await User.findOne({ mobileNumber });
        const eventType = existingUser ? 'login' : 'register';

        await Otp.findOneAndUpdate(
            { mobileNumber },
            { mobileNumber, otp, expiresAt, eventType },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const messageBody = `Your HandyConnect verification code is: ${otp}`;
        
        await twilioClient.messages.create({
            body: messageBody,
            from: twilioPhoneNumber,
            to: mobileNumber
        });

        return { success: true };

    } catch (error: any) {
        console.error('Custom send OTP error:', error);
        if (error.code === 21211) { // Invalid 'To' Phone Number
             return { error: 'Invalid mobile number format. Please check the number and country code.'};
        }
        return { error: error.message || 'An error occurred while sending the OTP.' };
    }
}

function getCountryFromMobileNumber(mobileNumber: string) {
    // This is a simplified lookup and may not be accurate for all numbers.
    // A more robust solution would involve a dedicated library.
    const country = countries.find(c => mobileNumber.startsWith(c.dial_code));
    return country;
}

export async function verifyOtpAndLogin(mobileNumber: string, code: string) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await dbConnect();
    
    const otpDoc = await Otp.findOne({ mobileNumber }).session(session);
    
    if (!otpDoc) {
        throw new Error('No OTP found for this number. Please request a new one.');
    }

    if (otpDoc.otp !== code) {
        throw new Error('Incorrect OTP. Please try again.');
    }

    if (new Date() > otpDoc.expiresAt) {
        await Otp.deleteOne({ _id: otpDoc._id }).session(session);
        throw new Error('OTP has expired. Please request a new one.');
    }
    
    let user = await User.findOne({ mobileNumber }).session(session);

    if (!user) {
      const countryData = getCountryFromMobileNumber(mobileNumber);
      const countryCode = countryData?.code || 'US';
      const currency = countryData?.currency || 'USD';
      
      const uniqueUsername = `user${new Date().getTime().toString(36)}`;

      user = new User({
        mobileNumber,
        username: uniqueUsername,
        fullName: `New User`,
        address: {
            line1: '', city: '', pinCode: '', country: countryCode,
        },
        currency: currency,
        freeTransactionsUsed: 0,
        dailyBookings: 0,
      });

      await user.save({ session });

      const newUserWallet = new Wallet({
        userId: user._id,
        balance: 0,
        currency: user.currency,
      });
      await newUserWallet.save({ session });
      
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (!user.lastLoginAt || user.lastLoginAt < today) {
            user.dailyBookings = 0;
        }
    }

    user.lastLoginAt = new Date();
    await user.save({ session });
    
    await Otp.deleteOne({ _id: otpDoc._id }).session(session);
    
    await session.commitTransaction();

    await setTokenCookie({
        userId: user._id.toString(),
        mobileNumber: user.mobileNumber,
        username: user.username,
        country: user.address.country,
        currency: user.currency,
        fullName: user.fullName,
    });

    return { success: true, user: parseJSON(user) };
  } catch (error: any) {
    await session.abortTransaction();
    console.error('Verify OTP and login error:', error);
    return { error: error.message || 'Login failed. Please try again.' };
  } finally {
      session.endSession();
  }
}

export async function logoutUser() {
    try {
        await clearTokenCookie();
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Logout failed.' };
    }
}


export async function getUserProfileById(userId: string) {
    try {
        await dbConnect();
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        return parseJSON(user);
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function updateUserProfile(data: UpdateUserProfileParams) {
    try {
        const payload = await getTokenPayload();
        if (!payload?.userId) {
            throw new Error("Authentication error: User not found.");
        }
        
        const validatedData = updateUserProfileSchema.parse(data);

        await dbConnect();
        
        const userToUpdate = await User.findById(payload.userId);
        if (!userToUpdate) {
            throw new Error("User not found in database.");
        }
        
        const { fullName, address, profileImage, username } = validatedData;
        
        // Check username availability if it has changed
        if (username.toLowerCase() !== userToUpdate.username.toLowerCase()) {
            const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
            if (existingUser && existingUser._id.toString() !== payload.userId) {
                throw new Error("Username is already taken.");
            }
        }
        
        userToUpdate.username = username;
        userToUpdate.fullName = fullName;
        userToUpdate.address.line1 = address.line1;
        userToUpdate.address.line2 = address.line2 || '';
        userToUpdate.address.city = address.city;
        userToUpdate.address.pinCode = address.pinCode;

        if (profileImage) {
            userToUpdate.profileImage = profileImage;
        }
        
        const updatedUser = await userToUpdate.save();
        
        await setTokenCookie({
            userId: updatedUser._id.toString(),
            mobileNumber: updatedUser.mobileNumber,
            username: updatedUser.username,
            country: updatedUser.address.country,
            currency: updatedUser.currency,
            fullName: updatedUser.fullName,
        });

        revalidatePath('/profile');
        revalidatePath('/dashboard');
        
        return parseJSON(updatedUser);

    } catch (error) {
        console.error("Error updating user profile:", error);
        if (error instanceof z.ZodError) {
            return { error: error.errors.map(e => e.message).join(', ') };
        }
        return { error: (error as Error).message || "Failed to update user profile." };
    }
}
