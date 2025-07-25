
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, Archive } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { archiveService } from '@/lib/actions/service.actions';

interface ArchiveServiceButtonProps {
    serviceId: string;
    serviceTitle: string;
    isArchived: boolean;
}

export function ArchiveServiceButton({ serviceId, serviceTitle, isArchived }: ArchiveServiceButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleArchive = async () => {
        setIsLoading(true);
        try {
            await archiveService(serviceId);
            toast({
                title: "Service Archived",
                description: `"${serviceTitle}" has been archived and is no longer public.`,
            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not archive service. Please try again.",
                variant: "destructive",
            });
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" title="Archive Service" disabled={isArchived || isLoading}>
              <Archive className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to archive this service?</AlertDialogTitle>
              <AlertDialogDescription>
                This will make your service "{serviceTitle}" inactive and it will no longer be bookable by new customers. This action cannot be undone. Existing bookings will not be affected.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleArchive} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Yes, Archive Service"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    );
}
