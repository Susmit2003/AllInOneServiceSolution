
// // 'use server';

// // import dbConnect from '@/lib/mongodb';
// // import Service from '@/models/service.model';
// // import User from '@/models/user.model';
// // import { revalidatePath } from 'next/cache';
// // import { parseJSON } from './utils';
// // import { getSafeUser } from './user.actions';
// // import { createServiceSchema, CreateServiceParams } from '../validations';
// // import { z } from 'zod';
// // import mongoose from 'mongoose';
// // import { geocodePincode, getDistance } from '@/lib/geocode';

// // const MAX_SERVICES_PER_PROVIDER = 3;

// // export async function createService(params: CreateServiceParams) {
// //   try {
// //     const user = await getSafeUser();
// //     if (!user) {
// //         return { error: 'You must be logged in to create a service.' };
// //     }
    
// //     // Validate incoming data
// //     const validatedParams = createServiceSchema.parse(params);
// //     const { title, category, subCategory, description, images, timeSlots, zipCodes, priceDisplay } = validatedParams;
    
// //     await dbConnect();

// //     const providerServiceCount = await Service.countDocuments({ userId: user.id, status: 'Active' });
// //     if (providerServiceCount >= MAX_SERVICES_PER_PROVIDER) {
// //       return { error: `You cannot have more than ${MAX_SERVICES_PER_PROVIDER} active services.` };
// //     }

// //     const serviceData: { [key: string]: any } = {
// //       userId: user.id,
// //       providerName: user.fullName || user.username,
// //       title,
// //       category,
// //       description,
// //       images,
// //       timeSlots,
// //       zipCodes,
// //       priceDisplay,
// //       ratingAvg: 0,
// //       totalReviews: 0,
// //       totalBookings: 0,
// //     };

// //     if (subCategory) {
// //       serviceData.subCategory = subCategory;
// //     }

// //     const newService = new Service(serviceData);

// //     await newService.save();
    
// //     revalidatePath('/dashboard/my-services');
// //     revalidatePath('/all-services');
    
// //     return parseJSON(newService);
// //   } catch (error) {
// //     if (error instanceof z.ZodError) {
// //         return { error: error.errors.map(e => e.message).join(', ') };
// //     }
// //     if (error instanceof mongoose.Error.ValidationError) {
// //       const messages = Object.values(error.errors).map(val => val.message);
// //       return { error: `Validation Error: ${messages.join(', ')}` };
// //     }
// //     console.error(error);
// //     return { error: 'Failed to create service due to a server error.' };
// //   }
// // }

// // export async function getProviderServices() {
// //     try {
// //         const user = await getSafeUser();
// //         if (!user) return [];

// //         await dbConnect();
// //         const services = await Service.find({ 
// //             userId: user.id,
// //             isActive: true
// //         }).sort({ createdAt: -1 });
// //         return parseJSON(services);
// //     } catch (error) {
// //         console.error(error);
// //         return [];
// //     }
// // }

// // export async function archiveService(serviceId: string) {
// //     try {
// //         const user = await getSafeUser();
// //         if (!user) {
// //             return { error: 'You must be logged in to archive a service.' };
// //         }
        
// //         await dbConnect();

// //         const service = await Service.findOne({ _id: serviceId, userId: user.id });
// //         if (!service) {
// //             return { error: 'Service not found or you are not authorized to modify it.' };
// //         }

// //         service.status = 'Archived';
// //         service.isActive = false;
// //         await service.save();

// //         revalidatePath('/dashboard/my-services');
// //         revalidatePath('/all-services');
// //         return { success: true };
// //     } catch (error) {
// //         console.error(error);
// //         return { error: 'Failed to archive service.' };
// //     }
// // }

// // export async function updateServiceStatus(serviceId: string, newStatus: 'Active' | 'Inactive') {
// //     try {
// //         const user = await getSafeUser();
// //         if (!user) {
// //             return { error: 'You must be logged in to update a service.' };
// //         }

// //         await dbConnect();

// //         if (newStatus === 'Active') {
// //             const activeCount = await Service.countDocuments({ userId: user.id, status: 'Active' });
// //             if (activeCount >= MAX_SERVICES_PER_PROVIDER) {
// //                 return { error: `You can have up to ${MAX_SERVICES_PER_PROVIDER} active services. Please inactivate another service first.` };
// //             }
// //         }
        
// //         const service = await Service.findOne({ _id: serviceId, userId: user.id });
// //         if (!service) {
// //             return { error: 'Service not found or you are not authorized to modify it.' };
// //         }
// //         if (service.status === 'Archived') {
// //             return { error: 'Cannot change the status of an archived service.' };
// //         }

// //         service.status = newStatus;
// //         await service.save();

// //         revalidatePath('/dashboard/my-services');
// //         revalidatePath('/all-services');
// //         return parseJSON(service);

// //     } catch (error) {
// //         console.error(error);
// //         return { error: 'Failed to update service status.' };
// //     }
// // }


// // interface GetServicesParams {
// //   query?: string;
// //   category?: string;
// //   subcategory?: string;
// //   pincode?: string;
// //   minRating?: number;
// // }

// // function escapeRegex(string: string) {
// //   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// // }


// // export async function getServices(params: GetServicesParams) {
// //     try {
// //         await dbConnect();
// //         const { query, category, subcategory, pincode, minRating } = params;

// //         const filter: any = { status: 'Active' };

// //         if (query) {
// //             const escapedQuery = escapeRegex(query);
// //             filter.$or = [
// //                 { title: { $regex: escapedQuery, $options: 'i' } },
// //                 { description: { $regex: escapedQuery, $options: 'i' } },
// //                 { providerName: { $regex: escapedQuery, $options: 'i' } },
// //             ];
// //         }

// //         if (category) filter.category = { $regex: `^${escapeRegex(category)}$`, $options: 'i' };
// //         if (subcategory) filter.subCategory = { $regex: `^${escapeRegex(subcategory)}$`, $options: 'i' };

// //         if (minRating) filter.ratingAvg = { $gte: minRating };

// //         let services: any[] = [];

// //         // 1. Primary Search: Try to find services in the exact pincode first.
// //         if (pincode) {
// //             filter.zipCodes = pincode;
// //             services = await Service.find(filter).sort({ ratingAvg: -1, createdAt: -1 });
// //         } else {
// //              services = await Service.find(filter).sort({ ratingAvg: -1, createdAt: -1 });
// //         }


// //         // 2. Fallback Search: If no services are found, find the nearest ones within 10km.
// //         if (services.length === 0 && pincode && category) {
// //             console.log(`No services found for pincode ${pincode}. Searching for nearest providers within 10km.`);

// //             const userLocation = await geocodePincode(pincode);

// //             if (userLocation) {
// //                 const fallbackFilter = { ...filter };
// //                 delete fallbackFilter.zipCodes;

// //                 const allServicesInCategory = await Service.find(fallbackFilter);

// //                 const servicesWithDistance = await Promise.all(
// //                     allServicesInCategory.map(async (service) => {
// //                         const providerPincode = service.zipCodes[0];
// //                         const providerLocation = await geocodePincode(providerPincode);

// //                         if (providerLocation) {
// //                             const distance = getDistance(
// //                                 userLocation.lat,
// //                                 userLocation.lon,
// //                                 providerLocation.lat,
// //                                 providerLocation.lon
// //                             );
// //                             return { ...service.toObject(), distance };
// //                         }
// //                         return { ...service.toObject(), distance: Infinity };
// //                     })
// //                 );

             
// //                 services = servicesWithDistance
// //                     .filter(s => s.distance <= 10) 
// //                     .sort((a, b) => a.distance - b.distance)
// //                     .slice(0, 10);
// //             }
// //         }

// //         return parseJSON(services);

// //     } catch (error) {
// //         console.error(error);
// //         return [];
// //     }
// // }

// // export async function getServiceById(serviceId: string) {
// //     try {
// //         await dbConnect();
// //         const service = await Service.findById(serviceId);
// //         return parseJSON(service);
// //     } catch (error) {
// //         console.error(error);
// //         return null;
// //     }
// // }

// // export async function updateService(serviceId: string, params: Partial<CreateServiceParams>) {
// //     try {
// //         const user = await getSafeUser();
// //         if (!user) {
// //             return { error: 'You must be logged in to update a service.' };
// //         }

// //         await dbConnect();

// //         const service = await Service.findOne({ _id: serviceId, userId: user.id });
// //         if (!service) {
// //             return { error: 'Service not found or you are not authorized to modify it.' };
// //         }
        
// //         // Use a partial schema for updates
// //         const validatedParams = createServiceSchema.partial().parse(params);

// //         Object.assign(service, validatedParams);

// //         await service.save();
        
// //         revalidatePath('/dashboard/my-services');
// //         revalidatePath(`/all-services/${serviceId}/book`);
        
// //         return parseJSON(service);

// //     } catch (error) {
// //         if (error instanceof z.ZodError) {
// //             return { error: error.errors.map(e => e.message).join(', ') };
// //         }
// //         console.error(error);
// //         return { error: 'Failed to update service due to a server error.' };
// //     }
// // }










// 'use server';

// import dbConnect from '@/lib/mongodb';
// import Service from '@/models/service.model';
// import User from '@/models/user.model';
// import { revalidatePath } from 'next/cache';
// import { parseJSON } from './utils';
// import { getSafeUser } from './user.actions';
// import { createServiceSchema, CreateServiceParams } from '../validations';
// import { z } from 'zod';
// import mongoose from 'mongoose';
// import { geocodePincode, getDistance } from '@/lib/geocode';

// const MAX_SERVICES_PER_PROVIDER = 3;

// // Helper to extract the first number from a price string like "$50/hr" or "From ₹120"
// const parsePrice = (priceDisplay: string): number => {
//     const numbers = priceDisplay.match(/\d+(\.\d+)?/g);
//     return numbers ? parseFloat(numbers[0]) : 0;
// };

// export async function createService(params: CreateServiceParams) {
//   try {
//     const user = await getSafeUser();
//     if (!user) {
//         return { error: 'You must be logged in to create a service.' };
//     }
    
//     const validatedParams = createServiceSchema.parse(params);
//     const { title, category, subCategory, description, images, timeSlots, zipCodes, priceDisplay } = validatedParams;
    
//     // **FIX:** Validate that a valid price can be extracted from the display string.
//     const numericPrice = parsePrice(priceDisplay);
//     if (numericPrice <= 0) {
//         return { error: 'Invalid Price Display. Please enter a valid price like "₹500" or "$25/hr".' };
//     }

//     await dbConnect();

//     const providerServiceCount = await Service.countDocuments({ userId: user.id, status: 'Active' });
//     if (providerServiceCount >= MAX_SERVICES_PER_PROVIDER) {
//       return { error: `You cannot have more than ${MAX_SERVICES_PER_PROVIDER} active services.` };
//     }

//     const serviceData: { [key: string]: any } = {
//       userId: user.id,
//       providerName: user.fullName || user.username,
//       title,
//       category,
//       description,
//       images,
//       timeSlots,
//       zipCodes,
//       price: numericPrice,
//       priceDisplay,
//       ratingAvg: 0,
//       totalReviews: 0,
//       totalBookings: 0,
//     };

//     if (subCategory) {
//       serviceData.subCategory = subCategory;
//     }

//     const newService = new Service(serviceData);

//     await newService.save();
    
//     revalidatePath('/dashboard/my-services');
//     revalidatePath('/all-services');
    
//     return parseJSON(newService);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//         const errorDetails = error.errors.map(e => `${e.path.join('.')} - ${e.message}`).join(', ');
//         return { error: `Validation failed. ${errorDetails}` };
//     }
//     if (error instanceof mongoose.Error.ValidationError) {
//       const messages = Object.values(error.errors).map(val => val.message);
//       return { error: `Validation Error: ${messages.join(', ')}` };
//     }
//     console.error(error);
//     return { error: 'Failed to create service due to a server error.' };
//   }
// }

// interface GetServicesParams {
//   query?: string;
//   category?: string;
//   subcategory?: string;
//   pincode?: string;
//   minRating?: number;
// }

// function escapeRegex(string: string) {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }


// export async function getServices(params: GetServicesParams) {
//     try {
//         await dbConnect();
//         const { query, category, subcategory, pincode, minRating } = params;
        
//         const filter: any = { status: 'Active' };
        
//         if (query) {
//             const escapedQuery = escapeRegex(query);
//             filter.$or = [
//                 { title: { $regex: escapedQuery, $options: 'i' } },
//                 { description: { $regex: escapedQuery, $options: 'i' } },
//                 { providerName: { $regex: escapedQuery, $options: 'i' } },
//             ];
//         }
        
//         if (category) filter.category = { $regex: `^${escapeRegex(category)}$`, $options: 'i' };
//         if (subcategory) filter.subCategory = { $regex: `^${escapeRegex(subcategory)}$`, $options: 'i' };

//         if (minRating) filter.ratingAvg = { $gte: minRating };
        
//         let services: any[] = [];

//         if (pincode) {
//             filter.zipCodes = pincode;
//             services = await Service.find(filter).sort({ ratingAvg: -1, createdAt: -1 });
//         } else {
//              services = await Service.find(filter).sort({ ratingAvg: -1, createdAt: -1 });
//         }

//         if (services.length === 0 && pincode && category) {
//             console.log(`No services found for pincode ${pincode}. Searching for nearest providers within 10km.`);

//             const userLocation = await geocodePincode(pincode);

//             if (userLocation) {
//                 const fallbackFilter = { ...filter };
//                 delete fallbackFilter.zipCodes;

//                 const allServicesInCategory = await Service.find(fallbackFilter);

//                 const servicesWithDistance = await Promise.all(
//                     allServicesInCategory.map(async (service) => {
//                         const providerPincode = service.zipCodes[0];
//                         const providerLocation = await geocodePincode(providerPincode);

//                         if (providerLocation) {
//                             const distance = getDistance(
//                                 userLocation.lat,
//                                 userLocation.lon,
//                                 providerLocation.lat,
//                                 providerLocation.lon
//                             );
//                             return { ...service.toObject(), distance };
//                         }
//                         return { ...service.toObject(), distance: Infinity };
//                     })
//                 );

//                 services = servicesWithDistance
//                     .filter(s => s.distance <= 10)
//                     .sort((a, b) => a.distance - b.distance)
//                     .slice(0, 10);
//             }
//         }

//         return parseJSON(services);

//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

// export async function getServiceById(serviceId: string) {
//     try {
//         await dbConnect();
//         const service = await Service.findById(serviceId);
//         return parseJSON(service);
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// export async function getProviderServices() {
//     try {
//         const user = await getSafeUser();
//         if (!user) return [];

//         await dbConnect();
//         const services = await Service.find({ 
//             userId: user.id,
//             isActive: true
//         }).sort({ createdAt: -1 });
//         return parseJSON(services);
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

// export async function archiveService(serviceId: string) {
//     try {
//         const user = await getSafeUser();
//         if (!user) {
//             return { error: 'You must be logged in to archive a service.' };
//         }
        
//         await dbConnect();

//         const service = await Service.findOne({ _id: serviceId, userId: user.id });
//         if (!service) {
//             return { error: 'Service not found or you are not authorized to modify it.' };
//         }

//         service.status = 'Archived';
//         service.isActive = false;
//         await service.save();

//         revalidatePath('/dashboard/my-services');
//         revalidatePath('/all-services');
//         return { success: true };
//     } catch (error) {
//         console.error(error);
//         return { error: 'Failed to archive service.' };
//     }
// }

// export async function updateServiceStatus(serviceId: string, newStatus: 'Active' | 'Inactive') {
//     try {
//         const user = await getSafeUser();
//         if (!user) {
//             return { error: 'You must be logged in to update a service.' };
//         }

//         await dbConnect();

//         if (newStatus === 'Active') {
//             const activeCount = await Service.countDocuments({ userId: user.id, status: 'Active' });
//             if (activeCount >= MAX_SERVICES_PER_PROVIDER) {
//                 return { error: `You can have up to ${MAX_SERVICES_PER_PROVIDER} active services. Please inactivate another service first.` };
//             }
//         }
        
//         const service = await Service.findOne({ _id: serviceId, userId: user.id });
//         if (!service) {
//             return { error: 'Service not found or you are not authorized to modify it.' };
//         }
//         if (service.status === 'Archived') {
//             return { error: 'Cannot change the status of an archived service.' };
//         }

//         service.status = newStatus;
//         await service.save();

//         revalidatePath('/dashboard/my-services');
//         revalidatePath('/all-services');
//         return parseJSON(service);

//     } catch (error) {
//         console.error(error);
//         return { error: 'Failed to update service status.' };
//     }
// }

// export async function updateService(serviceId: string, params: Partial<CreateServiceParams>) {
//     try {
//         const user = await getSafeUser();
//         if (!user) {
//             return { error: 'You must be logged in to update a service.' };
//         }

//         await dbConnect();

//         const service = await Service.findOne({ _id: serviceId, userId: user.id });
//         if (!service) {
//             return { error: 'Service not found or you are not authorized to modify it.' };
//         }
        
//         const validatedParams = createServiceSchema.partial().parse(params);

//         Object.assign(service, validatedParams);

//         await service.save();
        
//         revalidatePath('/dashboard/my-services');
//         revalidatePath(`/all-services/${serviceId}/book`);
        
//         return parseJSON(service);

//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return { error: error.errors.map(e => e.message).join(', ') };
//         }
//         console.error(error);
//         return { error: 'Failed to update service due to a server error.' };
//     }
// }







'use server';

import dbConnect from '@/lib/mongodb';
import Service from '@/models/service.model';
import User from '@/models/user.model';
import { revalidatePath } from 'next/cache';
import { parseJSON } from './utils';
import { getSafeUser } from './user.actions';
import { createServiceSchema, CreateServiceParams } from '../validations';
import { z } from 'zod';
import mongoose from 'mongoose';
import { geocodePincode, getDistance } from '@/lib/geocode';

const MAX_SERVICES_PER_PROVIDER = 3;

// Helper to extract the first number from a price string like "$50/hr" or "From ₹120"
const parsePrice = (priceDisplay: string): number => {
    if (!priceDisplay) return 0;
    const numbers = priceDisplay.match(/\d+(\.\d+)?/g);
    return numbers ? parseFloat(numbers[0]) : 0;
};

export async function createService(params: CreateServiceParams) {
  try {
    const user = await getSafeUser();
    if (!user) {
        return { error: 'You must be logged in to create a service.' };
    }
    
    const validatedParams = createServiceSchema.parse(params);
    const { title, category, subCategory, description, images, timeSlots, zipCodes, priceDisplay } = validatedParams;
    
    const numericPrice = parsePrice(priceDisplay);
    if (numericPrice <= 0) {
        return { error: 'Invalid Price Display. Please enter a valid price containing a number, like "₹500" or "$25/hr".' };
    }

    await dbConnect();

    const providerServiceCount = await Service.countDocuments({ userId: user.id, status: 'Active' });
    if (providerServiceCount >= MAX_SERVICES_PER_PROVIDER) {
      return { error: `You cannot have more than ${MAX_SERVICES_PER_PROVIDER} active services.` };
    }

    const serviceData: { [key: string]: any } = {
      userId: user.id,
      providerName: user.fullName || user.username,
      title,
      category,
      description,
      images,
      timeSlots,
      zipCodes,
      price: numericPrice,
      priceDisplay,
      ratingAvg: 0,
      totalReviews: 0,
      totalBookings: 0,
    };

    if (subCategory) {
      serviceData.subCategory = subCategory;
    }

    const newService = new Service(serviceData);

    await newService.save();
    
    revalidatePath('/dashboard/my-services');
    revalidatePath('/all-services');
    
    return parseJSON(newService);
  } catch (error) {
    if (error instanceof z.ZodError) {
        const errorDetails = error.errors.map(e => `${e.path.join('.')} - ${e.message}`).join(', ');
        return { error: `Validation failed. ${errorDetails}` };
    }
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map(val => val.message);
      return { error: `Validation Error: ${messages.join(', ')}` };
    }
    console.error(error);
    return { error: 'Failed to create service due to a server error.' };
  }
}

interface GetServicesParams {
  query?: string;
  category?: string;
  subcategory?: string;
  pincode?: string;
  minRating?: number;
}

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


export async function getServices(params: GetServicesParams) {
    try {
        await dbConnect();
        const { query, category, subcategory, pincode, minRating } = params;
        
        const filter: any = { status: 'Active' };
        
        if (query) {
            const escapedQuery = escapeRegex(query);
            filter.$or = [
                { title: { $regex: escapedQuery, $options: 'i' } },
                { description: { $regex: escapedQuery, $options: 'i' } },
                { providerName: { $regex: escapedQuery, $options: 'i' } },
            ];
        }
        
        if (category) filter.category = { $regex: `^${escapeRegex(category)}$`, $options: 'i' };
        if (subcategory) filter.subCategory = { $regex: `^${escapeRegex(subcategory)}$`, $options: 'i' };

        if (minRating) filter.ratingAvg = { $gte: minRating };
        
        let services: any[] = [];

        if (pincode) {
            filter.zipCodes = pincode;
            services = await Service.find(filter).sort({ ratingAvg: -1, createdAt: -1 });
        } else {
             services = await Service.find(filter).sort({ ratingAvg: -1, createdAt: -1 });
        }

        if (services.length === 0 && pincode && category) {
            console.log(`No services found for pincode ${pincode}. Searching for nearest providers within 10km.`);

            const userLocation = await geocodePincode(pincode);

            if (userLocation) {
                const fallbackFilter = { ...filter };
                delete fallbackFilter.zipCodes;

                const allServicesInCategory = await Service.find(fallbackFilter);

                const servicesWithDistance = await Promise.all(
                    allServicesInCategory.map(async (service) => {
                        const providerPincode = service.zipCodes[0];
                        const providerLocation = await geocodePincode(providerPincode);

                        if (providerLocation) {
                            const distance = getDistance(
                                userLocation.lat,
                                userLocation.lon,
                                providerLocation.lat,
                                providerLocation.lon
                            );
                            return { ...service.toObject(), distance };
                        }
                        return { ...service.toObject(), distance: Infinity };
                    })
                );

                services = servicesWithDistance
                    .filter(s => s.distance <= 10)
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 10);
            }
        }

        return parseJSON(services);

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getServiceById(serviceId: string) {
    try {
        await dbConnect();
        const service = await Service.findById(serviceId);
        return parseJSON(service);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getProviderServices() {
    try {
        const user = await getSafeUser();
        if (!user) return [];

        await dbConnect();
        const services = await Service.find({ 
            userId: user.id,
            isActive: true
        }).sort({ createdAt: -1 });
        return parseJSON(services);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function archiveService(serviceId: string) {
    try {
        const user = await getSafeUser();
        if (!user) {
            return { error: 'You must be logged in to archive a service.' };
        }
        
        await dbConnect();

        const service = await Service.findOne({ _id: serviceId, userId: user.id });
        if (!service) {
            return { error: 'Service not found or you are not authorized to modify it.' };
        }

        // **FIX:** Backfill the price if it's missing before saving.
        if (typeof service.price !== 'number' || !isFinite(service.price)) {
            service.price = parsePrice(service.priceDisplay);
        }

        service.status = 'Archived';
        service.isActive = false;
        await service.save();

        revalidatePath('/dashboard/my-services');
        revalidatePath('/all-services');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to archive service.' };
    }
}

export async function updateServiceStatus(serviceId: string, newStatus: 'Active' | 'Inactive') {
    try {
        const user = await getSafeUser();
        if (!user) {
            return { error: 'You must be logged in to update a service.' };
        }

        await dbConnect();

        if (newStatus === 'Active') {
            const activeCount = await Service.countDocuments({ userId: user.id, status: 'Active' });
            if (activeCount >= MAX_SERVICES_PER_PROVIDER) {
                return { error: `You can have up to ${MAX_SERVICES_PER_PROVIDER} active services. Please inactivate another service first.` };
            }
        }
        
        const service = await Service.findOne({ _id: serviceId, userId: user.id });
        if (!service) {
            return { error: 'Service not found or you are not authorized to modify it.' };
        }
        if (service.status === 'Archived') {
            return { error: 'Cannot change the status of an archived service.' };
        }

        // **FIX:** Backfill the price if it's missing before saving.
        if (typeof service.price !== 'number' || !isFinite(service.price)) {
            service.price = parsePrice(service.priceDisplay);
        }

        service.status = newStatus;
        await service.save();

        revalidatePath('/dashboard/my-services');
        revalidatePath('/all-services');
        return parseJSON(service);

    } catch (error) {
        console.error(error);
        return { error: 'Failed to update service status.' };
    }
}

export async function updateService(serviceId: string, params: Partial<CreateServiceParams>) {
    try {
        const user = await getSafeUser();
        if (!user) {
            return { error: 'You must be logged in to update a service.' };
        }

        await dbConnect();

        const service = await Service.findOne({ _id: serviceId, userId: user.id });
        if (!service) {
            return { error: 'Service not found or you are not authorized to modify it.' };
        }
        
        const validatedParams = createServiceSchema.partial().parse(params);

        Object.assign(service, validatedParams);
        
        // **FIX:** If the price display was updated, recalculate the numeric price.
        if (validatedParams.priceDisplay) {
            service.price = parsePrice(validatedParams.priceDisplay);
        }

        await service.save();
        
        revalidatePath('/dashboard/my-services');
        revalidatePath(`/all-services/${serviceId}/book`);
        
        return parseJSON(service);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { error: 'Failed to update service due to a server error.' };
    }
}
