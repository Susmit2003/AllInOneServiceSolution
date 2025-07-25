
// export interface Address {
//   line1: string;
//   line2?: string;
//   city: string;
//   pinCode: string;
//   country: string; // Country code e.g., US, IN
// }

// export interface UserProfile {
//   id: string; // Represents MongoDB's _id
//   mobileNumber: string;
//   username: string;
//   fullName?: string;
//   profileImage?: string; // URL
//   address: Address;
//   currency: string; // Currency code e.g., USD, INR
//   lastLoginAt?: Date;
//   walletBalance: number;
//   freeTransactionsUsed: number;
//   dailyBookings: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Service {
//   id: string; // Represents MongoDB's _id
//   userId: string; // Provider's ID
//   providerName: string; // Denormalized for display convenience
//   title: string;
//   category: string;
//   subCategory?: string;
//   description: string;
//   images: string[]; // URLs of images
//   timeSlots: string[];
//   zipCodes: string[];
//   ratingAvg?: number;
//   totalReviews?: number;
//   priceDisplay: string; // e.g., "$10/hr" or "From $50"
//   totalBookings?: number;
//   dataAiHint?: string;
//   status: 'Active' | 'Inactive' | 'Archived';
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface Booking {
//   id: string; // Represents MongoDB's _id
//   serviceId: string;
//   serviceTitle: string; // Denormalized
//   providerId: string;
//   providerName: string; // Denormalized
//   bookedByUserId: string;
//   bookedByUserName: string; // Denormalized
//   serviceDate: string; // ISO Date string for the actual service
//   timeSlot: string;
//   address: Address;
//   status: "Requested" | "Accepted" | "InProgress" | "Completed" | "Cancelled" | "Incompleted";
//   paymentStatus: "pending" | "free" | "fee_paid" | "failed";
//   bookerFeePaid: number;
//   providerFeePaid: number;
//   currency: string;
//   idempotencyKey?: string;
//   createdAt: Date;
//   updatedAt: Date;

//   serviceVerificationCode: string;
//   serviceVerified: boolean;
//   serviceVerifiedAt?: string; // ISO Date string

//   userFeedback?: {
//     stars: number;
//     text?: string;
//   };
//   providerFeedback?: {
//       stars: number;
//       text?: string;
//   };

//   // Timestamps for status changes
//   requestedAt: string; // ISO Date string
//   acceptedAt?: string; // ISO Date string
//   inProgressAt?: string; // ISO Date string
//   completedAt?: string; // ISO Date string
//   cancelledAt?: string; // ISO Date string
//   cancelledBy?: 'user' | 'provider';
//   incompletedAt?: string; // ISO Date string
// }

// export interface Transaction {
//   id: string;
//   userId: string;
//   type: 'top_up' | 'booking_fee' | 'cancellation_fee' | 'refund';
//   amount: number; // Positive for credit, negative for debit
//   currency: string;
//   description: string;
//   relatedBookingId?: string;
//   createdAt: Date;
// }

// export interface PaymentOrder {
//     id: string;
//     userId: string;
//     amount: number;
//     currency: string;
//     razorpayOrderId: string;
//     status: 'created' | 'paid' | 'failed';
//     razorpayPaymentId?: string;
//     razorpaySignature?: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

// export interface Notification {
//   id: string;
//   userId: string;
//   title: string;
//   message: string;
//   isRead: boolean;
//   link?: string;
//   relatedBookingId?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }



export interface Address {
  line1: string;
  line2?: string;
  city: string;
  pinCode: string;
  country: string; // Country code e.g., US, IN
}

export interface UserProfile {
  id: string; // Represents MongoDB's _id
  mobileNumber: string;
  username: string;
  fullName?: string;
  profileImage?: string; // URL
  address: Address;
  currency: string; // Currency code e.g., USD, INR
  lastLoginAt?: Date;
  walletBalance: number;
  monthlyFreeBookings: number; // Updated from freeTransactionsUsed
  dailyBookings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string; // Represents MongoDB's _id
  userId: string; // Provider's ID
  providerName: string; // Denormalized for display convenience
  title: string;
  category: string;
  subCategory?: string;
  description: string;
  images: string[]; // URLs of images
  timeSlots: string[];
  zipCodes: string[];
  ratingAvg?: number;
  totalReviews?: number;
  price: number; // Added numeric price
  priceDisplay: string; // e.g., "$10/hr" or "From $50"
  totalBookings?: number;
  dataAiHint?: string;
  status: 'Active' | 'Inactive' | 'Archived';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string; // Represents MongoDB's _id
  serviceId: string;
  serviceTitle: string; // Denormalized
  providerId: string;
  providerName: string; // Denormalized
  bookedByUserId: string;
  bookedByUserName: string; // Denormalized
  serviceDate: string; // ISO Date string for the actual service
  timeSlot: string;
  address: Address;
  status: "Requested" | "Accepted" | "InProgress" | "Completed" | "Cancelled" | "Incompleted";
  paymentStatus: "pending" | "free" | "fee_paid" | "failed";
  bookerFeePaid: number;
  providerFeePaid: number;
  servicePrice: number; // Added service price at time of booking
  currency: string;
  idempotencyKey?: string;
  createdAt: Date;
  updatedAt: Date;

  serviceVerificationCode: string;
  serviceVerified: boolean;
  serviceVerifiedAt?: string; // ISO Date string

  userFeedback?: {
    stars: number;
    text?: string;
  };
  providerFeedback?: {
      stars: number;
      text?: string;
  };

  // Timestamps for status changes
  requestedAt: string; // ISO Date string
  acceptedAt?: string; // ISO Date string
  inProgressAt?: string; // ISO Date string
  completedAt?: string; // ISO Date string
  cancelledAt?: string; // ISO Date string
  cancelledBy?: 'user' | 'provider';
  incompletedAt?: string; // ISO Date string
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'top_up' | 'booking_fee' | 'cancellation_fee' | 'refund';
  amount: number; // Positive for credit, negative for debit
  currency: string;
  description: string;
  relatedBookingId?: string;
  createdAt: Date;
}

export interface PaymentOrder {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    razorpayOrderId: string;
    status: 'created' | 'paid' | 'failed';
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  relatedBookingId?: string;
  createdAt: Date;
  updatedAt: Date;
}
