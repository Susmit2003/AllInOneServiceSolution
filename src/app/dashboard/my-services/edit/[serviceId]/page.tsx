
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import Link from "next/link";

export default function EditServiceDisabledPage() {
    return (
        <div className="container mx-auto max-w-3xl py-8">
            <Card className="shadow-xl text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                        <Ban className="h-10 w-10 text-destructive" />
                    </div>
                    <CardTitle className="font-headline text-2xl">Editing Services is Disabled</CardTitle>
                    <CardDescription>Services cannot be edited after they are published to maintain consistency for existing bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">If you need to make changes, please archive the current service and create a new one.</p>
                     <Link href="/dashboard/my-services">
                        <Button variant="outline">Back to My Services</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
