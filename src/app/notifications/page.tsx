
import { getUserNotifications } from '@/lib/actions/notification.actions';
import { getSafeUser } from '@/lib/actions/user.actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BellRing, BellOff } from 'lucide-react';
import { NotificationList } from '@/components/custom/notification-list';
import type { Notification } from '@/types';

export default async function NotificationsPage() {
    const user = await getSafeUser();
    if (!user) {
        return (
            <Card className="text-center py-12 shadow-md">
                <CardHeader>
                    <BellOff className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <CardTitle className="font-headline text-2xl">Login to See Your Notifications</CardTitle>
                </CardHeader>
            </Card>
        );
    }
    
    const notifications = await getUserNotifications() as Notification[];

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with all your account and booking activities.</p>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BellRing className="h-6 w-6 text-primary" />
                        <span>All Notifications</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {notifications.length > 0 ? (
                        <NotificationList initialNotifications={notifications} />
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <BellOff className="mx-auto h-12 w-12 mb-4" />
                            <p className="font-semibold">You're all caught up!</p>
                            <p>You have no notifications at the moment.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
