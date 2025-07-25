
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { updateServiceStatus } from '@/lib/actions/service.actions';
import { Loader2 } from 'lucide-react';

interface ServiceStatusToggleProps {
    serviceId: string;
    initialStatus: 'Active' | 'Inactive';
}

export function ServiceStatusToggle({ serviceId, initialStatus }: ServiceStatusToggleProps) {
    const [status, setStatus] = useState(initialStatus);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleToggle = async (checked: boolean) => {
        setIsLoading(true);
        const newStatus = checked ? 'Active' : 'Inactive';

        const result = await updateServiceStatus(serviceId, newStatus);
        
        if (result.error) {
            toast({
                title: "Error updating status",
                description: result.error,
                variant: "destructive"
            });
        } else {
            setStatus(newStatus);
            toast({
                title: "Status Updated",
                description: `Service is now ${newStatus}.`
            });
            // We need to refresh the page to update counts etc.
            router.refresh(); 
        }
        setIsLoading(false);
    }

    return (
        <div className="flex items-center space-x-2">
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
                <Switch 
                    id={`status-toggle-${serviceId}`}
                    checked={status === 'Active'}
                    onCheckedChange={handleToggle}
                    aria-label={`Toggle service status to ${status === 'Active' ? 'Inactive' : 'Active'}`}
                />
            )}
            <Label htmlFor={`status-toggle-${serviceId}`} className="text-sm font-medium text-muted-foreground">
                {status}
            </Label>
        </div>
    );
}
