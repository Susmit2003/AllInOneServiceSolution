
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Tag, ArrowRight } from 'lucide-react';
import { RatingStars } from './rating-stars';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <CardHeader className="p-0 relative">
        <Link href={`/all-services/${service.id}/book`} className="block">
          <Image
            src={service.images[0] || "https://placehold.co/600x400.png"}
            alt={service.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={`${service.category} service`}
          />
        </Link>
        {service.priceDisplay && (
           <Badge variant="secondary" className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-sm text-sm py-1 px-3">
            {service.priceDisplay}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/all-services/${service.id}/book`} className="block">
          <CardTitle className="font-headline text-xl mb-2 hover:text-primary transition-colors truncate" title={service.title}>
            {service.title}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-1 flex items-center">
          <Tag className="h-4 w-4 mr-2 text-sky-500" /> {service.category}
        </p>
        <p className="text-sm text-muted-foreground mb-3 flex items-center">
          By: <span className="font-medium ml-1 text-foreground">{service.providerName}</span>
        </p>
        
        <div className="flex items-center mb-3">
          <RatingStars rating={service.ratingAvg || 0} totalReviews={service.totalReviews || 0} />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {service.description}
        </p>
         <p className="text-xs text-muted-foreground flex items-center">
          <MapPin className="h-3 w-3 mr-1 text-orange-500" /> Serves PIN/ZIPs: {service.zipCodes.join(', ')}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Link href={`/all-services/${service.id}/book`} className="w-full">
          <Button className="w-full">
            Book Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
