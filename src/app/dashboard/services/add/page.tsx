
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Loader2, UploadCloud, PlusCircle, X, AlertCircle } from 'lucide-react';
import { createService } from '@/lib/actions/service.actions';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import { TimeSlotSelector } from '@/components/custom/time-slot-selector';
import { serviceHierarchy, currencySymbols } from '@/lib/constants';
import { uploadImage } from '@/lib/actions/cloudinary.actions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_ZIP_CODES = 5;

export default function AddServicePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subCategory: '',
    description: '',
    priceDisplay: ''
  });
  const [zipCodes, setZipCodes] = useState<string[]>(['']);
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceImageFile, setServiceImageFile] = useState<File | null>(null);
  const [serviceImagePreview, setServiceImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill the user's own PIN/ZIP code if it exists and the field is empty.
    if (currentUser?.address?.pinCode) {
      setZipCodes(prev => (prev.length === 1 && prev[0] === '') ? [currentUser.address.pinCode] : prev);
    }
  }, [currentUser]);


  if (!currentUser) {
    return <div className="container mx-auto py-8">Please log in to add a service.</div>
  }

  // Guide user to complete their profile if they haven't set a PIN/ZIP code
  if (!currentUser.address?.pinCode) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl md:text-3xl">Complete Your Profile</CardTitle>
            <CardDescription>You need to add a PIN/ZIP code to your profile before you can add a service.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Address Information Required</AlertTitle>
              <AlertDescription>
                Your service listings need a default location. Please go to your profile and add your address details, including your primary PIN/ZIP code.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Link href="/profile">
              <Button>Go to Profile</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };
  
  const handleZipCodeChange = (index: number, value: string) => {
    const newZipCodes = [...zipCodes];
    newZipCodes[index] = value;
    setZipCodes(newZipCodes);
  };
  
  const addZipCodeField = () => {
    if (zipCodes.length < MAX_ZIP_CODES) {
      setZipCodes([...zipCodes, '']);
    } else {
        toast({
            title: `You can add a maximum of ${MAX_ZIP_CODES} PIN/ZIP codes.`,
            variant: "destructive"
        })
    }
  };

  const removeZipCodeField = (index: number) => {
    if(zipCodes.length > 1) {
        const newZipCodes = zipCodes.filter((_, i) => i !== index);
        setZipCodes(newZipCodes);
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value, subCategory: '' }));
    const selectedCat = serviceHierarchy.find(c => c.name === value);
    setAvailableSubcategories(selectedCat?.subcategories.map(sc => sc.name) || []);
  };
  
  const handleSubCategoryChange = (value: string) => {
      setFormData(prev => ({ ...prev, subCategory: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
          variant: "destructive",
        });
        return;
      }
      setServiceImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const currencySymbol = currencySymbols[currentUser.currency] || '$';
  const pricePlaceholder = `e.g., ${currencySymbol}50/hr or From ${currencySymbol}120`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validZipCodes = zipCodes.filter(zc => zc.trim() !== '');
    
    try {
      let imageUrls = ['https://placehold.co/600x400.png'];

      if (serviceImageFile && serviceImagePreview) {
        const uploadResult = await uploadImage(serviceImagePreview, `service_images/${currentUser.id}`);
        if ('error' in uploadResult) {
            throw new Error(uploadResult.error);
        }
        imageUrls = [uploadResult.secure_url];
      }

      const result = await createService({
        ...formData,
        zipCodes: validZipCodes,
        images: imageUrls, 
        timeSlots: selectedTimeSlots,
      });

      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
          title: "Service Added!",
          description: "Your new service has been listed successfully.",
      });
      router.push('/dashboard/services');

    } catch (error) {
      console.error(error);
      toast({
          title: "Error Creating Service",
          description: (error as Error).message || "Could not add service. Please check your inputs and try again.",
          variant: "destructive"
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl md:text-3xl">Add New Service</CardTitle>
          <CardDescription>Provide details about the service you offer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="space-y-2">
              <Label htmlFor="serviceImage" className="text-base">Service Image</Label>
              <div className="relative w-full aspect-video rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-center p-4">
                {serviceImagePreview ? (
                  <Image src={serviceImagePreview} alt="Service image preview" layout="fill" objectFit="cover" className="rounded-lg" />
                ) : (
                  <div className="space-y-2 text-muted-foreground">
                    <UploadCloud className="h-10 w-10 mx-auto" />
                    <p className="font-semibold">Click to upload an image</p>
                    <p className="text-xs">PNG, JPG, or WEBP. Max 4MB.</p>
                  </div>
                )}
                <Input id="serviceImage" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} required/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">Service Title</Label>
              <Input id="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Professional House Cleaning" className="h-12" required minLength={5} maxLength={100} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  required
                >
                  <SelectTrigger id="category" className="h-12">
                    <SelectValue placeholder="Select service category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceHierarchy.map(cat => (
                      <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {availableSubcategories.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="subcategory" className="text-base">Sub-category</Label>
                  <Select value={formData.subCategory} onValueChange={handleSubCategoryChange} required>
                    <SelectTrigger id="subcategory" className="h-12">
                      <SelectValue placeholder="Select sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubcategories.map(subCat => (
                        <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">Description</Label>
              <Textarea id="description" value={formData.description} onChange={handleInputChange} placeholder="Describe your service in detail..." className="min-h-[120px]" required minLength={20} maxLength={1000} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="priceDisplay" className="text-base">Price Display</Label>
                    <Input id="priceDisplay" value={formData.priceDisplay} onChange={handleInputChange} placeholder={pricePlaceholder} className="h-12" required maxLength={50} />
                </div>
                <div className="space-y-2">
                    <Label className="text-base">Service PIN/ZIP Code(s)</Label>
                    <div className="space-y-2">
                        {zipCodes.map((zip, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input 
                                    value={zip} 
                                    onChange={(e) => handleZipCodeChange(index, e.target.value)} 
                                    placeholder={`PIN/ZIP Code ${index + 1}`}
                                    className="h-12"
                                    required
                                    minLength={4}
                                    maxLength={10} 
                                />
                                {zipCodes.length > 1 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeZipCodeField(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                     {zipCodes.length < MAX_ZIP_CODES && (
                        <Button type="button" variant="outline" size="sm" onClick={addZipCodeField} className="mt-2">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add another code
                        </Button>
                    )}
                    <p className="text-xs text-muted-foreground">You can add up to {MAX_ZIP_CODES} service locations.</p>
                </div>
            </div>

            <TimeSlotSelector selectedSlots={selectedTimeSlots} onSelectionChange={setSelectedTimeSlots} />

            <Button type="submit" className="w-full md:w-auto h-12 text-base" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              {isLoading ? "Saving Service..." : "Save Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
