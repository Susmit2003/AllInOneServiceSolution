
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServicesLoading() {
    return (
        <div className="container mx-auto py-8">
             <header className="mb-8">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-12 w-2/3" />
                <Skeleton className="h-6 w-1/2 mt-4" />
            </header>
            <Separator className="my-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-2/3 rounded" />
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                     <Skeleton className="h-10 w-full rounded" />
                  </CardFooter>
                </Card>
              ))}
            </div>
        </div>
    )
}
