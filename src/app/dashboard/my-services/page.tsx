
import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Eye, MapPin, PackageCheck, CalendarClock, ListChecks, Archive, CircleDot } from 'lucide-react';
import { RatingStars } from '@/components/custom/rating-stars';
import { getProviderServices } from '@/lib/actions/service.actions';
import { getSafeUser } from '@/lib/actions/user.actions';
import { ArchiveServiceButton } from '@/components/custom/delete-service-button';
import { ServiceStatusToggle } from '@/components/custom/service-status-toggle';
import { format } from 'date-fns';

const MAX_SERVICES = 3;

export default async function ProviderServicesPage() {
  const user = await getSafeUser();
  
  if (!user) {
    return <div className="container mx-auto py-8">Please log in to manage your services.</div>;
  }

  const allServices = await getProviderServices();
  const activeServices = allServices.filter(s => s.status === 'Active');
  
  const getStatusBadge = (status: Service['status']) => {
    switch (status) {
      case 'Active':
        return <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white"><CircleDot className="h-3 w-3 mr-1" />Active</Badge>;
      case 'Inactive':
        return <Badge variant="secondary"><CircleDot className="h-3 w-3 mr-1 text-yellow-500" />Inactive</Badge>;
      case 'Archived':
        return <Badge variant="destructive"><Archive className="h-3 w-3 mr-1" />Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold">My Services</h1>
          <p className="text-muted-foreground">Manage your service listings. You can have up to {MAX_SERVICES} active services ({activeServices.length}/{MAX_SERVICES}).</p>
        </div>
        {activeServices.length < MAX_SERVICES && (
          <Link href="/dashboard/my-services/add">
            <Button size="lg">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Service
            </Button>
          </Link>
        )}
      </div>

      {allServices.length === 0 ? (
        <Card className="text-center py-12 shadow-md">
          <CardHeader>
            <ListChecks className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle className="font-headline text-2xl">No Services Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>You haven't added any services. Get started by adding your first one!</CardDescription>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/dashboard/my-services/add">
            <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Add Your First Service
            </Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map(service => (
            <Card key={service.id} className={`flex flex-col shadow-lg transition-opacity ${service.status !== 'Active' ? 'opacity-70 bg-muted/30' : ''}`}>
              <Image
                src={service.images[0] || "https://placehold.co/300x200.png"}
                alt={service.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-t-lg"
                data-ai-hint={`${service.category} service`}
              />
              <CardHeader>
                 <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-xl truncate" title={service.title}>{service.title}</CardTitle>
                    {getStatusBadge(service.status)}
                 </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{service.category}</Badge>
                  {service.subCategory && <Badge variant="secondary">{service.subCategory}</Badge>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 p-4">
                <div className="flex justify-between items-center text-lg font-semibold text-primary">
                  <span>{service.priceDisplay}</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <PackageCheck className="h-4 w-4 mr-1.5" />
                    <span>{service.totalBookings || 0} booked</span>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <RatingStars rating={service.ratingAvg || 0} size={16} totalReviews={service.totalReviews || 0} />
                </div>
                
                <Separator className="my-3" />

                <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0" /> 
                        <span>Serves: {service.zipCodes.join(', ')}</span>
                    </p>
                    <p className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2 shrink-0" />
                        <span>Last updated: {format(new Date(service.updatedAt), 'MMM d, yyyy')}</span>
                    </p>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between items-center gap-2">
                <div className="flex-1">
                  {service.status !== 'Archived' && (
                    <ServiceStatusToggle serviceId={service.id} initialStatus={service.status as 'Active' | 'Inactive'} />
                  )}
                </div>
                <div className="flex gap-2">
                    <Link href={`/all-services/${service.id}/book`}>
                      <Button variant="outline" size="icon" title="View Public Listing" disabled={service.status !== 'Active'}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <ArchiveServiceButton serviceId={service.id} serviceTitle={service.title} isArchived={service.status === 'Archived'} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
       {activeServices.length >= MAX_SERVICES && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          You have reached the maximum limit of {MAX_SERVICES} active services. Archive or inactivate one to add a new service.
        </p>
      )}
    </div>
  );
}
