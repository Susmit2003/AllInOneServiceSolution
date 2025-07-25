
// 'use server';

// import dbConnect from '@/lib/mongodb';
// import Notification from '@/models/notification.model';
// import { getSafeUser } from './user.actions';
// import { parseJSON } from './utils';
// import { revalidatePath } from 'next/cache';
// import { doc, setDoc } from 'firebase/firestore';
// import { db as firestoreDb } from '@/lib/firebase';
// interface CreateNotificationParams {
//     userId: string;
//     title: string;
//     message: string;
//     link?: string;
//     relatedBookingId?: string;
// }

// export async function createNotification(params: CreateNotificationParams) {
//     try {
//         await dbConnect();
//         const notification = new Notification(params);
//         await notification.save();
        

//         // Revalidate the path for the notifications popover which might be on any page
//         revalidatePath('/'); 
//         revalidatePath('/notifications');
//         return parseJSON(notification);
//     } catch (error) {
//         console.error('Failed to create notification', error);
//         return { error: 'Failed to create notification' };
//     }
// }

// export async function getUserNotifications() {
//     try {
//         const user = await getSafeUser();
//         if (!user) return [];

//         await dbConnect();
//         const notifications = await Notification.find({ userId: user.id }).sort({ createdAt: -1 }).limit(50);
//         return parseJSON(notifications);
//     } catch (error) {
//         console.error('Failed to get user notifications', error);
//         return [];
//     }
// }

// export async function getUnreadNotificationsCount() {
//     try {
//         const user = await getSafeUser();
//         if (!user) return 0;

//         await dbConnect();
//         const count = await Notification.countDocuments({ userId: user.id, isRead: false });
//         return count;
//     } catch (error) {
//         console.error('Failed to get unread notifications count', error);
//         return 0;
//     }
// }

// export async function markNotificationAsRead(notificationId: string) {
//     try {
//         const user = await getSafeUser();
//         if (!user) throw new Error('User not authenticated');

//         await dbConnect();
//         const notification = await Notification.findOneAndUpdate(
//             { _id: notificationId, userId: user.id },
//             { isRead: true },
//             { new: true }
//         );

//         if (!notification) throw new Error('Notification not found');
        
//         revalidatePath('/');
//         revalidatePath('/notifications');
//         return parseJSON(notification);

//     } catch (error) {
//         console.error('Failed to mark notification as read', error);
//         return { error: 'Failed to mark notification as read' };
//     }
// }

// export async function markAllNotificationsAsRead() {
//     try {
//         const user = await getSafeUser();
//         if (!user) throw new Error('User not authenticated');

//         await dbConnect();
//         await Notification.updateMany({ userId: user.id, isRead: false }, { isRead: true });

//         revalidatePath('/');
//         revalidatePath('/notifications');
//         return { success: true };
//     } catch (error) {
//         console.error('Failed to mark all notifications as read', error);
//         return { error: 'Failed to mark all notifications as read' };
//     }
// }





'use server';

import dbConnect from '@/lib/mongodb';
import Notification, { INotification } from '@/models/notification.model';
import { getSafeUser } from './user.actions';
import { parseJSON } from './utils';
import { revalidatePath } from 'next/cache';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db as firestoreDb } from '@/lib/firebase';

interface CreateNotificationParams {
    userId: string;
    title: string;
    message: string;
    link?: string;
    relatedBookingId?: string;
}

export async function createNotification(params: CreateNotificationParams) {
    try {
        await dbConnect();
        const notification = new Notification(params);
        // Cast the result of .save() to the INotification interface
        const savedNotification = await notification.save() as INotification;

        try {
            const notificationForFirestore = {
                ...parseJSON(savedNotification),
                // Ensure dates are serializable strings for Firestore
                createdAt: savedNotification.createdAt.toISOString(),
                updatedAt: savedNotification.updatedAt.toISOString(),
            };
            const userNotificationsRef = doc(firestoreDb, `users/${params.userId}/notifications`, savedNotification._id.toString());
            await setDoc(userNotificationsRef, notificationForFirestore);
        } catch (firestoreError) {
            console.error('Failed to write notification to Firestore:', firestoreError);
            // Non-critical error, so we don't throw, just log it.
        }

        revalidatePath('/'); 
        revalidatePath('/notifications');
        // Return the saved notification, not the original unsaved one
        return parseJSON(savedNotification);
    } catch (error) {
        console.error('Failed to create notification', error);
        return { error: 'Failed to create notification' };
    }
}

export async function getUserNotifications() {
    try {
        const user = await getSafeUser();
        if (!user) return [];

        await dbConnect();
        const notifications = await Notification.find({ userId: user.id }).sort({ createdAt: -1 }).limit(50);
        return parseJSON(notifications);
    } catch (error) {
        console.error('Failed to get user notifications', error);
        return [];
    }
}

export async function getUnreadNotificationsCount() {
    try {
        const user = await getSafeUser();
        if (!user) return 0;

        await dbConnect();
        const count = await Notification.countDocuments({ userId: user.id, isRead: false });
        return count;
    } catch (error) {
        console.error('Failed to get unread notifications count', error);
        return 0;
    }
}

export async function markNotificationAsRead(notificationId: string) {
    try {
        const user = await getSafeUser();
        if (!user) throw new Error('User not authenticated');

        await dbConnect();
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, userId: user.id },
            { isRead: true },
            { new: true }
        ) as INotification | null; // Cast the result here

        if (!notification) throw new Error('Notification not found');

        // Also update the document in Firestore
        try {
            const notificationRef = doc(firestoreDb, `users/${user.id}/notifications`, notificationId);
            await updateDoc(notificationRef, { isRead: true });
        } catch (firestoreError) {
            console.error('Failed to update notification in Firestore:', firestoreError);
        }
        
        revalidatePath('/');
        revalidatePath('/notifications');
        return parseJSON(notification);

    } catch (error) {
        console.error('Failed to mark notification as read', error);
        return { error: 'Failed to mark notification as read' };
    }
}

export async function markAllNotificationsAsRead() {
    try {
        const user = await getSafeUser();
        if (!user) throw new Error('User not authenticated');

        await dbConnect();
        const unreadNotifications = await Notification.find({ userId: user.id, isRead: false });

        if (unreadNotifications.length > 0) {
            await Notification.updateMany({ userId: user.id, isRead: false }, { isRead: true });

            // Also update all documents in Firestore
            try {
                const promises = unreadNotifications.map(notif => {
                    const notificationRef = doc(firestoreDb, `users/${user.id}/notifications`, notif._id.toString());
                    return updateDoc(notificationRef, { isRead: true });
                });
                await Promise.all(promises);
            } catch (firestoreError) {
                console.error('Failed to update notifications in Firestore:', firestoreError);
            }
        }

        revalidatePath('/');
        revalidatePath('/notifications');
        return { success: true };
    } catch (error) {
        console.error('Failed to mark all notifications as read', error);
        return { error: 'Failed to mark all notifications as read' };
    }
}
