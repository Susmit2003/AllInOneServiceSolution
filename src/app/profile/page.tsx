
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Globe, Save, Camera, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUserProfile, checkUsernameAvailability } from "@/lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { countries, currencySymbols } from "@/lib/constants";
import { uploadImage } from "@/lib/actions/cloudinary.actions";
import { updateUserProfileSchema, UpdateUserProfileParams } from "@/lib/validations";

type ProfileFormValues = Omit<UpdateUserProfileParams, 'profileImage'>;

export default function ProfilePage() {
  const { currentUser, isLoading: isAuthLoading, refreshUser } = useAuth();
  const { toast } = useToast();
  
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [debouncedUsername, setDebouncedUsername] = useState('');

  const { control, handleSubmit, reset, watch, formState: { isSubmitting, errors } } = useForm<ProfileFormValues>({
      resolver: zodResolver(updateUserProfileSchema.omit({ profileImage: true })),
      defaultValues: {
          username: '',
          fullName: '',
          address: {
              line1: '',
              line2: '',
              city: '',
              pinCode: '',
          },
      }
  });

  const watchedUsername = watch('username');

  // Debounce effect for username checking
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUsername(watchedUsername);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [watchedUsername]);

  // Effect to check username availability
  useEffect(() => {
    if (!debouncedUsername || !currentUser) {
      setUsernameStatus('idle');
      return;
    }
    
    if (debouncedUsername.toLowerCase() === currentUser.username.toLowerCase()) {
      setUsernameStatus('idle');
      return;
    }

    const validationResult = z.string().min(3).max(20).regex(/^[a-zA-Z0-9_.]+$/).safeParse(debouncedUsername);
    if (!validationResult.success) {
        setUsernameStatus('idle');
        return;
    }

    async function check() {
      setUsernameStatus('checking');
      const result = await checkUsernameAvailability(debouncedUsername);
      if (result.available) {
        setUsernameStatus('available');
      } else {
        setUsernameStatus('taken');
      }
    }
    check();
  }, [debouncedUsername, currentUser]);

  useEffect(() => {
    if(currentUser) {
        reset({
            username: currentUser.username || '',
            fullName: currentUser.fullName || '',
            address: {
                line1: currentUser.address.line1 || '',
                line2: currentUser.address.line2 || '',
                city: currentUser.address.city || '',
                pinCode: currentUser.address.pinCode || '',
            },
        });
    }
  }, [currentUser, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: ProfileFormValues) => {
    if (!currentUser) return;
    
    if (usernameStatus === 'taken') {
        toast({
            title: "Username is taken",
            description: "Please choose a different username.",
            variant: "destructive"
        });
        return;
    }

    try {
      let uploadedImageUrl = currentUser.profileImage;

      if (profileImageFile && profileImagePreview) {
          const uploadResult = await uploadImage(profileImagePreview, `profile_images/${currentUser.id}`);
          if ('error' in uploadResult) {
              throw new Error(uploadResult.error);
          }
          uploadedImageUrl = uploadResult.secure_url;
      }

      const result = await updateUserProfile({
          ...data,
          profileImage: uploadedImageUrl,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      await refreshUser(); 
      toast({
          title: "Success",
          description: "Your profile has been updated successfully.",
      });
      setProfileImageFile(null);
      setProfileImagePreview(null);
      setUsernameStatus('idle');
    } catch (error) {
      toast({
          title: "Error updating profile",
          description: (error as Error).message || "Failed to update profile. Please try again.",
          variant: "destructive"
      });
    }
  };


  if (isAuthLoading || !currentUser) {
    return (
      <div className="container mx-auto max-w-3xl py-8">
        <Card>
          <CardHeader>
             <Skeleton className="h-8 w-1/2" />
             <Skeleton className="h-4 w-3/4 mt-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex justify-center"><Skeleton className="h-32 w-32 rounded-full" /></div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const countryName = countries.find(c => c.code === currentUser.address.country)?.name || currentUser.address.country;
  const currencySymbol = currencySymbols[currentUser.currency] || '$';

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl md:text-3xl">Manage Your Profile</CardTitle>
          <CardDescription>Keep your personal information up to date.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-primary/20 group-hover:border-primary/50 transition-colors">
                  <AvatarImage src={profileImagePreview || currentUser.profileImage || `https://placehold.co/150x150.png?text=${currentUser.fullName?.charAt(0) || 'U'}`} alt={currentUser.fullName || "User"} data-ai-hint="user profile"/>
                  <AvatarFallback>{currentUser.fullName?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <Label htmlFor="profileImageInput" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors shadow-md">
                  <Camera className="h-5 w-5" />
                  <span className="sr-only">Change profile image</span>
                </Label>
                <Input id="profileImageInput" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
              <p className="text-xs text-muted-foreground">Click the camera to upload a new image (max 2MB).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-base">Username</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Controller name="username" control={control} render={({ field }) => <Input {...field} id="username" placeholder="Enter a unique username" className="pl-10 h-12" required />} />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {usernameStatus === 'checking' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                            {usernameStatus === 'available' && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {usernameStatus === 'taken' && <XCircle className="h-5 w-5 text-destructive" />}
                        </div>
                    </div>
                    {errors.username && <p className="text-destructive text-xs mt-1">{errors.username.message}</p>}
                    {usernameStatus === 'taken' && <p className="text-destructive text-xs mt-1">This username is already taken.</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-base">Full Name</Label>
                    <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Controller name="fullName" control={control} render={({ field }) => <Input {...field} id="fullName" placeholder="Enter your full name" className="pl-10 h-12" maxLength={50} required />} />
                    </div>
                    {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>}
                </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">Address</Label>
              <div className="relative">
                 <MapPin className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                 <Controller name="address.line1" control={control} render={({ field }) => <Input {...field} id="addressLine1" placeholder="Address Line 1" className="pl-10 h-12 mb-2" maxLength={100} required />} />
              </div>
               {errors.address?.line1 && <p className="text-destructive text-xs mt-1">{errors.address.line1.message}</p>}

              <Controller name="address.line2" control={control} render={({ field }) => <Input {...field} id="addressLine2" placeholder="Address Line 2 (Optional)" className="h-12" maxLength={100} />} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                 <div>
                    <Controller name="address.city" control={control} render={({ field }) => <Input {...field} id="city" placeholder="City" className="h-12" maxLength={50} required />} />
                    {errors.address?.city && <p className="text-destructive text-xs mt-1">{errors.address.city.message}</p>}
                 </div>
                 <div>
                    <Controller name="address.pinCode" control={control} render={({ field }) => <Input {...field} id="pinCode" placeholder="PIN/ZIP Code" className="h-12" maxLength={10} required />} />
                    {errors.address?.pinCode && <p className="text-destructive text-xs mt-1">{errors.address.pinCode.message}</p>}
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-base">Country</Label>
                 <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    id="country"
                    value={countryName}
                    readOnly
                    className="pl-10 h-12 bg-muted/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-base">Currency</Label>
                 <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground flex items-center justify-center text-lg font-medium">{currencySymbol}</span>
                  <Input
                    id="currency"
                    value={currentUser.currency}
                    readOnly
                    className="pl-10 h-12 bg-muted/50"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto h-12 text-base" disabled={isSubmitting || usernameStatus === 'checking'}>
              {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
