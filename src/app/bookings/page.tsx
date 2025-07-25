
import type { Booking } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Repeat } from 'lucide-react';
import Link from 'next/link';
import { getUserBookings } from '@/lib/actions/booking.actions';
import { getSafeUser } from '@/lib/actions/user.actions';
import { BookingCard } from '@/components/custom/booking-card';

export default async function BookingsPage() {
  const user = await getSafeUser();
  
  if (!user) {
    return (
        <Card className="text-center py-12 shadow-md">
            <CardHeader>
                <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <CardTitle className="font-headline text-2xl">Login to See Your Bookings</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>You need to be logged in to view your bookings.</CardDescription>
            </CardContent>
            <CardFooter className="justify-center">
                <Link href="/login">
                <Button size="lg">Login</Button>
                </Link>
            </CardFooter>
        </Card>
    );
  }

  const bookings = await getUserBookings();

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-headline text-2xl md:text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <Card className="text-center py-12 shadow-md">
          <CardHeader>
            <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="font-headline text-2xl">No Bookings Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>You haven't made any bookings. Explore services and book your first one!</CardDescription>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/all-services">
              <Button size="lg">Explore Services</Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
