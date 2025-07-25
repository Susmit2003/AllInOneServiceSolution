
// "use client";

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Bell, CheckCheck } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from '@/components/ui/separator';
// import type { Notification } from '@/types';
// import { getUnreadNotificationsCount, getUserNotifications, markAllNotificationsAsRead } from '@/lib/actions/notification.actions';
// import { cn } from '@/lib/utils';
// import { formatDistanceToNow } from 'date-fns';
// import { Skeleton } from '../ui/skeleton';
// import { useRouter } from 'next/navigation';

// export function NotificationsPopover() {
//     const [unreadCount, setUnreadCount] = useState(0);
//     const [notifications, setNotifications] = useState<Notification[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isOpen, setIsOpen] = useState(false);
//     const router = useRouter();

//     const fetchData = async () => {
//         setIsLoading(true);
//         const [count, notifs] = await Promise.all([
//             getUnreadNotificationsCount(),
//             getUserNotifications(),
//         ]);
//         setUnreadCount(count);
//         setNotifications(notifs as Notification[]);
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         fetchData();
//         // Periodically check for new notifications
//         const interval = setInterval(fetchData, 60000); // every minute
//         return () => clearInterval(interval);
//     }, []);

//     const handleMarkAllRead = async () => {
//         await markAllNotificationsAsRead();
//         fetchData();
//     };

//     const handleOpenChange = (open: boolean) => {
//         setIsOpen(open);
//         if (open) {
//             fetchData(); // Refresh when opening
//         }
//     }

//     return (
//         <Popover open={isOpen} onOpenChange={handleOpenChange}>
//             <PopoverTrigger asChild>
//                 <Button variant="ghost" size="icon" className="relative">
//                     <Bell className="h-5 w-5" />
//                     {unreadCount > 0 && (
//                         <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//                             {unreadCount}
//                         </span>
//                     )}
//                     <span className="sr-only">Toggle notifications</span>
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 p-0" align="end">
//                 <div className="flex items-center justify-between p-4 border-b">
//                     <h3 className="font-semibold">Notifications</h3>
//                     {unreadCount > 0 && (
//                         <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
//                             <CheckCheck className="mr-2 h-4 w-4" />
//                             Mark all as read
//                         </Button>
//                     )}
//                 </div>
//                 <ScrollArea className="h-96">
//                     {isLoading ? (
//                         <div className="p-4 space-y-4">
//                            <Skeleton className="h-16 w-full" />
//                            <Skeleton className="h-16 w-full" />
//                            <Skeleton className="h-16 w-full" />
//                         </div>
//                     ) : notifications.length > 0 ? (
//                         <div className="divide-y">
//                             {notifications.map((notif) => (
//                                 <Link
//                                     key={notif.id}
//                                     href={notif.link || '#'}
//                                     className={cn(
//                                         "block p-4 hover:bg-secondary/50",
//                                         !notif.isRead && "bg-primary/5"
//                                     )}
//                                     onClick={() => setIsOpen(false)}
//                                 >
//                                     <p className="font-semibold">{notif.title}</p>
//                                     <p className="text-sm text-muted-foreground">{notif.message}</p>
//                                     <p className="text-xs text-muted-foreground mt-1">
//                                         {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
//                                     </p>
//                                 </Link>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="p-8 text-center text-sm text-muted-foreground">
//                             You have no notifications yet.
//                         </p>
//                     )}
//                 </ScrollArea>
//                 <Separator />
//                 <div className="p-2">
//                     <Link href="/notifications" onClick={() => setIsOpen(false)}>
//                         <Button variant="ghost" className="w-full">
//                             View All Notifications
//                         </Button>
//                     </Link>
//                 </div>
//             </PopoverContent>
//         </Popover>
//     );
// }




// src/components/layout/notifications-popover.tsx

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { Notification } from '@/types';
import { getUserNotifications, markAllNotificationsAsRead } from '@/lib/actions/notification.actions';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '../ui/skeleton';
import { useAuth } from '@/context/auth-context';

// --- Add Firestore imports ---
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db as firestoreDb } from '@/lib/firebase';
// -----------------------------

export function NotificationsPopover() {
    const { currentUser } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch initial notifications via Server Action
    const fetchInitialData = async () => {
        setIsLoading(true);
        const notifs = await getUserNotifications();
        setNotifications(notifs as Notification[]);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!currentUser) return;
        
        // Fetch initial data on component mount
        fetchInitialData();

        // --- Set up the real-time listener ---
        const q = query(
            collection(firestoreDb, `users/${currentUser.id}/notifications`),
            orderBy("createdAt", "desc"),
            limit(20) // Listen for the 20 most recent notifications
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            // When new data arrives, update the state
            const newNotifications = snapshot.docs.map(doc => doc.data() as Notification);
            setNotifications(newNotifications);
            setIsLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();

    }, [currentUser]);

    const handleMarkAllRead = async () => {
        await markAllNotificationsAsRead();
        // The listener will automatically pick up the read status change if you also update firestore
        // For simplicity here, we'll just refresh the state from the backend
        const notifs = await getUserNotifications();
        setNotifications(notifs as Notification[]);
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            // Optional: You can still re-fetch here if you want to be extra sure
            // fetchInitialData();
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                            <CheckCheck className="mr-2 h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-96">
                    {isLoading ? (
                        <div className="p-4 space-y-4">
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                        </div>
                    ) : notifications.length > 0 ? (
                        <div className="divide-y">
                            {notifications.map((notif) => (
                                <Link
                                    key={notif.id}
                                    href={notif.link || '#'}
                                    className={cn(
                                        "block p-4 hover:bg-secondary/50",
                                        !notif.isRead && "bg-primary/5"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <p className="font-semibold">{notif.title}</p>
                                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="p-8 text-center text-sm text-muted-foreground">
                            You have no notifications yet.
                        </p>
                    )}
                </ScrollArea>
                <Separator />
                <div className="p-2">
                    <Link href="/notifications" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full">
                            View All Notifications
                        </Button>
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}