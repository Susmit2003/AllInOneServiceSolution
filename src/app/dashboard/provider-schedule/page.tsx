
import type { Booking } from '@/types';
import { getProviderBookings } from '@/lib/actions/booking.actions';
import { getSafeUser } from '@/lib/actions/user.actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ListOrdered, CalendarX2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProviderBookingCard } from '@/components/custom/provider-booking-card';

export default async function ProviderSchedulePage() {
    const user = await getSafeUser();

    if (!user) {
        return (
            <Card className="text-center py-12 shadow-md">
                <CardHeader>
                    <ListOrdered className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <CardTitle className="font-headline text-2xl">Login Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>You need to be logged in to view your provider schedule.</CardDescription>
                </CardContent>
            </Card>
        );
    }

    const bookings: Booking[] = await getProviderBookings();

    if (bookings.length === 0) {
        return (
            <Card className="text-center py-12 shadow-md">
                <CardHeader>
                    <CalendarX2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <CardTitle className="font-headline text-2xl">No Bookings Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>You do not have any bookings from customers yet. Make sure your services are active and visible.</CardDescription>
                </CardContent>
            </Card>
        );
    }
    
    const requestedBookings = bookings.filter(b => b.status === 'Requested');
    const acceptedBookings = bookings.filter(b => b.status === 'Accepted');
    const inProgressBookings = bookings.filter(b => b.status === 'InProgress');
    const pendingFeedbackBookings = bookings.filter(b => b.status === 'Completed' && !b.providerFeedback);
    const completedBookings = bookings.filter(b => b.status === 'Completed' && !!b.providerFeedback);
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled');


    const renderBookingList = (list: Booking[], emptyMessage: string) => {
        if (list.length === 0) {
            return <p className="text-muted-foreground text-center py-8">{emptyMessage}</p>;
        }
        return (
            <div className="space-y-6">
                {list.map(booking => (
                    <ProviderBookingCard key={booking.id} booking={booking} />
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="font-headline text-2xl md:text-3xl font-bold">Provider Schedule</h1>
                <p className="text-muted-foreground">Manage all your customer bookings from here.</p>
            </div>
            
            <Tabs defaultValue="requested">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
                    <TabsTrigger value="requested">New Requests ({requestedBookings.length})</TabsTrigger>
                    <TabsTrigger value="accepted">Upcoming ({acceptedBookings.length})</TabsTrigger>
                    <TabsTrigger value="inProgress">In Progress ({inProgressBookings.length})</TabsTrigger>
                    <TabsTrigger value="pendingFeedback">Needs Feedback ({pendingFeedbackBookings.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="requested" className="mt-6">
                    {renderBookingList(requestedBookings, "You have no new booking requests.")}
                </TabsContent>
                <TabsContent value="accepted" className="mt-6">
                    {renderBookingList(acceptedBookings, "No upcoming bookings.")}
                </TabsContent>
                <TabsContent value="inProgress" className="mt-6">
                    {renderBookingList(inProgressBookings, "No services are currently in progress.")}
                </TabsContent>
                <TabsContent value="pendingFeedback" className="mt-6">
                    {renderBookingList(pendingFeedbackBookings, "No completed services are awaiting your feedback.")}
                </TabsContent>
                <TabsContent value="completed" className="mt-6">
                    {renderBookingList(completedBookings, "No bookings have been completed yet.")}
                </TabsContent>
                <TabsContent value="cancelled" className="mt-6">
                    {renderBookingList(cancelledBookings, "You have no cancelled bookings.")}
                </TabsContent>
            </Tabs>
        </div>
    );
}
