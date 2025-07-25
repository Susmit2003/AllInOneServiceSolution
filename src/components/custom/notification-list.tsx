
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';
import type { Notification } from '@/types';
import { markAllNotificationsAsRead, markNotificationAsRead } from '@/lib/actions/notification.actions';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NotificationListProps {
    initialNotifications: Notification[];
}

export function NotificationList({ initialNotifications }: NotificationListProps) {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleMarkAllRead = async () => {
        await markAllNotificationsAsRead();
        setNotifications(notifications.map(n => ({...n, isRead: true})));
    };
    
    const handleMarkOneRead = async (notificationId: string) => {
        await markNotificationAsRead(notificationId);
        setNotifications(notifications.map(n => n.id === notificationId ? {...n, isRead: true} : n));
    };

    const hasUnread = notifications.some(n => !n.isRead);

    return (
        <div>
            {hasUnread && (
                 <div className="mb-4 flex justify-end">
                    <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                        <CheckCheck className="mr-2 h-4 w-4" />
                        Mark all as read
                    </Button>
                </div>
            )}
            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={cn(
                            "p-4 rounded-lg border flex items-start gap-4 transition-colors",
                            !notif.isRead && "bg-primary/5 border-primary/20"
                        )}
                    >
                        <div className="flex-grow">
                             <Link href={notif.link || '/notifications'} onClick={() => !notif.isRead && handleMarkOneRead(notif.id)}>
                                <p className="font-semibold hover:text-primary">{notif.title}</p>
                             </Link>
                            <p className="text-sm text-muted-foreground">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                            </p>
                        </div>
                         {!notif.isRead && (
                             <div className="flex-shrink-0">
                                 <Button variant="ghost" size="sm" onClick={() => handleMarkOneRead(notif.id)} title="Mark as read">
                                     <CheckCheck className="h-4 w-4" />
                                     <span className="sr-only">Mark as read</span>
                                 </Button>
                             </div>
                         )}
                    </div>
                ))}
            </div>
        </div>
    );
}
