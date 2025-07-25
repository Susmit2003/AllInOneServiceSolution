
import { Suspense } from 'react';
import type { Service } from '@/types';
import { getServiceById } from '@/lib/actions/service.actions';
import { getSafeUser } from '@/lib/actions/user.actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CalendarClock, MapPin, DollarSign, Loader2, Ban } from 'lucide-react';
import NextImage from 'next/image';
import { RatingStars } from '@/components/custom/rating-stars';
import Link from 'next/link';
import { BookingForm } from '@/components/custom/booking-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';


async function BookServicePage({ params }: { params: { serviceId: string } }) {
  const serviceId = params.serviceId;
  const service = await getServiceById(serviceId);
  const user = await getSafeUser();

  if (!service) {
    return <div className="container mx-auto py-8 text-center">Service not found. <Link href="/services" className="text-primary hover:underline">Browse other services.</Link></div>;
  }
  
  const isOwnService = service?.userId === user?.id;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service Details Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                   {service.status !== 'Active' && (
                     <Badge variant="destructive" className="mb-2 uppercase tracking-wider">{service.status}</Badge>
                   )}
                  <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">{service.title}</h1>
                  <p className="text-muted-foreground">By <span className="text-primary font-medium">{service.providerName}</span> in <span className="font-medium">{service.category}</span></p>
                </div>
                {service.priceDisplay && (
                  <Badge variant="secondary" className="text-base py-2 px-4 whitespace-nowrap">
                    {service.priceDisplay}
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-2">
                <RatingStars rating={service.ratingAvg || 0} totalReviews={service.totalReviews || 0} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[16/10] w-full mb-6 rounded-lg overflow-hidden">
                 <NextImage src={service.images[0]} alt={service.title} layout="fill" objectFit="cover" data-ai-hint={`${service.category} service closeup`}/>
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">Service Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{service.description}</p>
              
              {service.images.length > 1 && (
                <div className="mt-6">
                  <h3 className="font-headline text-lg font-semibold mb-2">More Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {service.images.slice(1).map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-md overflow-hidden">
                        <NextImage src={img} alt={`${service.title} - image ${idx+2}`} layout="fill" objectFit="cover" data-ai-hint={`${service.category} service detail`}/>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Form Column */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-24">
             {isOwnService ? (
                 <CardContent className="p-6">
                     <Alert variant="destructive">
                        <Ban className="h-5 w-5" />
                        <AlertTitle>Action Not Allowed</AlertTitle>
                        <AlertDescription>
                          You cannot book your own service. To manage this listing, go to your <Link href="/dashboard/services" className="font-semibold underline hover:text-destructive-foreground/80">Provider Dashboard</Link>.
                        </AlertDescription>
                      </Alert>
                 </CardContent>
             ) : service.status !== 'Active' ? (
                 <CardContent className="p-6">
                    <Alert variant="destructive">
                        <Ban className="h-5 w-5" />
                        <AlertTitle>Service Unavailable</AlertTitle>
                        <AlertDescription>
                            This service is currently <span className="font-semibold">{service.status}</span> and cannot be booked at this time.
                        </AlertDescription>
                    </Alert>
                 </CardContent>
             ) : (
                <BookingForm service={service} user={user} />
             )}
          </Card>
        </div>
      </div>
    </div>
  );
}


export default function BookServicePageContainer({ params }: { params: { serviceId: string } }) {
    return (
        <Suspense fallback={
            <div className="container mx-auto py-8 text-center flex justify-center items-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Loading service details...</p>
            </div>
        }>
            <BookServicePage params={params} />
        </Suspense>
    );
}
