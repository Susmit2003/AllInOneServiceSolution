
// import { z } from 'zod';

// // Shared address schema, used for both profile and booking addresses
// export const addressSchema = z.object({
//     line1: z.string().min(5, { message: "Address line 1 must be at least 5 characters." }).max(100, { message: "Address cannot exceed 100 characters." }),
//     line2: z.string().max(100).optional(),
//     city: z.string().min(2, { message: "City must be at least 2 characters." }).max(50),
//     pinCode: z.string()
//       .min(4, { message: "PIN/ZIP Code must be at least 4 characters." })
//       .max(10, { message: "PIN/ZIP Code cannot exceed 10 characters." })
//       .regex(/^[a-zA-Z0-9\s-]*$/, { message: "PIN/ZIP Code contains invalid characters." }),
//     country: z.string().min(2).max(50),
// });

// // User Profile Update Schema
// export const updateUserProfileSchema = z.object({
//   username: z.string()
//     .min(3, { message: "Username must be at least 3 characters." })
//     .max(20, { message: "Username cannot exceed 20 characters." })
//     .regex(/^[a-zA-Z0-9_.]+$/, { message: "Username can only contain letters, numbers, underscores, and periods." }),
//   fullName: z.string()
//     .min(2, { message: "Full name must be at least 2 characters." })
//     .max(50, { message: "Full name cannot exceed 50 characters." }),
//   address: addressSchema.omit({ country: true }), // Country is not editable via this form
//   profileImage: z.string().url("Invalid image URL.").optional(),
// });
// export type UpdateUserProfileParams = z.infer<typeof updateUserProfileSchema>;

// // Service Creation Schema
// export const createServiceSchema = z.object({
//     title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100, { message: "Title cannot exceed 100 characters."}),
//     category: z.string().min(1, { message: "Category is required." }),
//     subCategory: z.string().optional(),
//     description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000, { message: "Description cannot exceed 1000 characters."}),
//     images: z.array(z.string().url()).min(1, { message: "At least one image is required." }),
//     timeSlots: z.array(z.string()).min(1, { message: "At least one time slot is required." }),
//     zipCodes: z.array(
//         z.string()
//           .min(4, { message: "Each PIN/ZIP Code must be at least 4 characters." })
//           .max(10, { message: "Each PIN/ZIP Code cannot exceed 10 characters." })
//           .regex(/^[a-zA-Z0-9\s-]*$/, { message: "A PIN/ZIP Code contains invalid characters." })
//     ).min(1, { message: "At least one PIN/ZIP code is required." }).max(5, { message: "You can add a maximum of 5 PIN/ZIP codes." }),
//     priceDisplay: z.string().min(1, { message: "Price display is required." }).max(50, { message: "Price display cannot exceed 50 characters." }),
// });
// export type CreateServiceParams = z.infer<typeof createServiceSchema>;


// // Booking Creation Schema
// export const createBookingSchema = z.object({
//     serviceId: z.string(),
//     providerId: z.string(),
//     bookedByUserId: z.string(),
//     serviceDate: z.date({ required_error: "A service date must be selected." }),
//     timeSlot: z.string().min(1, { message: "A time slot must be selected." }),
//     address: addressSchema,
//     idempotencyKey: z.string().uuid("Invalid idempotency key."),
// });
// export type CreateBookingParams = z.infer<typeof createBookingSchema>;















import { z } from 'zod';

// Shared address schema, used for both profile and booking addresses
export const addressSchema = z.object({
    line1: z.string().min(5, { message: "Address line 1 must be at least 5 characters." }).max(100, { message: "Address cannot exceed 100 characters." }),
    line2: z.string().max(100).optional(),
    city: z.string().min(2, { message: "City must be at least 2 characters." }).max(50),
    pinCode: z.string()
      .min(4, { message: "PIN/ZIP Code must be at least 4 characters." })
      .max(10, { message: "PIN/ZIP Code cannot exceed 10 characters." })
      .regex(/^[a-zA-Z0-9\s-]*$/, { message: "PIN/ZIP Code contains invalid characters." }),
    country: z.string().min(2).max(50),
});

// User Profile Update Schema
export const updateUserProfileSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username cannot exceed 20 characters." })
    .regex(/^[a-zA-Z0-9_.]+$/, { message: "Username can only contain letters, numbers, underscores, and periods." }),
  fullName: z.string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(50, { message: "Full name cannot exceed 50 characters." }),
  address: addressSchema.omit({ country: true }), // Country is not editable via this form
  profileImage: z.string().url("Invalid image URL.").optional(),
});
export type UpdateUserProfileParams = z.infer<typeof updateUserProfileSchema>;

// Service Creation Schema
export const createServiceSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100, { message: "Title cannot exceed 100 characters."}),
    category: z.string().min(1, { message: "Category is required." }),
    subCategory: z.string().optional(),
    description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000, { message: "Description cannot exceed 1000 characters."}),
    images: z.array(z.string().url()).min(1, { message: "At least one image is required." }),
    timeSlots: z.array(z.string()).min(1, { message: "At least one time slot is required." }),
    zipCodes: z.array(
        z.string()
          .min(4, { message: "Each PIN/ZIP Code must be at least 4 characters." })
          .max(10, { message: "Each PIN/ZIP Code cannot exceed 10 characters." })
          .regex(/^[a-zA-Z0-9\s-]*$/, { message: "A PIN/ZIP Code contains invalid characters." })
    ).min(1, { message: "At least one PIN/ZIP code is required." }).max(5, { message: "You can add a maximum of 5 PIN/ZIP codes." }),
    // **FIX:** Removed the numeric `price` field. It will be derived on the server.
    priceDisplay: z.string().min(1, { message: "Price display is required." }).max(50, { message: "Price display cannot exceed 50 characters." }),
});
export type CreateServiceParams = z.infer<typeof createServiceSchema>;


// Booking Creation Schema
export const createBookingSchema = z.object({
    serviceId: z.string(),
    providerId: z.string(),
    bookedByUserId: z.string(),
    serviceDate: z.date({ required_error: "A service date must be selected." }),
    timeSlot: z.string().min(1, { message: "A time slot must be selected." }),
    address: addressSchema,
    idempotencyKey: z.string().uuid("Invalid idempotency key."),
    servicePrice: z.number(),
});
export type CreateBookingParams = z.infer<typeof createBookingSchema>;
