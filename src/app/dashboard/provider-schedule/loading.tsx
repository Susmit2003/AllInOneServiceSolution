
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

export default function ProviderScheduleLoading() {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-1/2 mt-2" />
            </div>

            <div className="space-y-6">
                 <Skeleton className="h-12 w-full rounded-md" />

                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="shadow-lg">
                        <CardHeader className="p-4 md:p-6">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <Skeleton className="h-5 w-1/3 mt-2" />
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                        <CardFooter className="p-4 md:p-6 flex justify-between">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-32" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
