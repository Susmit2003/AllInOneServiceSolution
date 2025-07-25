
// "use client";

// import { useState, useEffect } from 'react';
// import type { Service, UserProfile, Booking } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
// import { ShoppingCart, Ban, LogIn, Loader2, Wallet, CalendarClock, MapPin, Send, Clock } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import Link from 'next/link';
// import { createBooking, getUnavailableSlots } from '@/lib/actions/booking.actions';
// import { currencySymbols, FREE_TRANSACTION_LIMIT } from '@/lib/constants';
// import { Calendar } from '@/components/ui/calendar';
// import { Skeleton } from '../ui/skeleton';

// interface BookingFormProps {
//     service: Service;
//     user: UserProfile | null;
// }

// const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export function BookingForm({ service, user }: BookingFormProps) {
//   const { toast } = useToast();
  
//   const [date, setDate] = useState<Date | undefined>();
//   const [availableSlots, setAvailableSlots] = useState<string[]>([]);
//   const [isLoadingSlots, setIsLoadingSlots] = useState(false);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
//   const [address, setAddress] = useState(user?.address.line1 || '');
//   const [city, setCity] = useState(user?.address.city || '');
//   const [pinCode, setPinCode] = useState(user?.address.pinCode || '');
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [bookingRequested, setBookingRequested] = useState<Booking | null>(null);

//   const isFreeTransaction = user ? (user.freeTransactionsUsed ?? 0) < FREE_TRANSACTION_LIMIT : false;
//   const dailyLimitReached = user ? (user.dailyBookings ?? 0) >= 10 : false;
//   const currencySymbol = user ? (currencySymbols[user.currency] || user.currency) : '$';

//   const threeMonthsFromNow = new Date();
//   threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

//   useEffect(() => {
//     if (!date || !service) return;

//     const fetchAndSetAvailableSlots = async () => {
//       setIsLoadingSlots(true);
//       const dayName = dayNames[date.getDay()];
      
//       let potentialSlots = service.timeSlots
//         .filter(slot => slot.startsWith(dayName))
//         .map(slot => slot.replace(dayName + ' ', ''));
        
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Compare dates only, not time

//       const selectedDate = new Date(date);
//       selectedDate.setHours(0,0,0,0);

//       if (selectedDate.getTime() === today.getTime()) {
//           const currentHour = new Date().getHours();
//           potentialSlots = potentialSlots.filter(slot => {
//               const slotStartHour = parseInt(slot.split('-')[0].split(':')[0], 10);
//               return slotStartHour > currentHour;
//           });
//       }

//       const unavailableSlots = await getUnavailableSlots(service.id, date);

//       const trulyAvailableSlots = potentialSlots.filter(slot => !unavailableSlots.includes(slot));
      
//       setAvailableSlots(trulyAvailableSlots);
//       setSelectedTimeSlot(''); 
//       setIsLoadingSlots(false);
//     };

//     fetchAndSetAvailableSlots();
//   }, [date, service.id, service.timeSlots]);


//   const handleBooking = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) {
//       toast({ title: "Authentication Error", description: "You must be logged in to book a service.", variant: "destructive" });
//       return;
//     }
//     if (dailyLimitReached) {
//       toast({ title: "Booking Limit Reached", description: `You cannot book more than 10 services per day.`, variant: "destructive" });
//       return;
//     }
//     if (!selectedTimeSlot || !date) {
//       toast({ title: "Missing Information", description: "Please select a date and a time slot.", variant: "destructive" });
//       return;
//     }
//     setIsSubmitting(true);
    
//     try {
//       const idempotencyKey = crypto.randomUUID();
//       const result = await createBooking({
//         serviceId: service.id,
//         providerId: service.userId,
//         bookedByUserId: user.id,
//         serviceDate: date,
//         timeSlot: selectedTimeSlot,
//         address: { line1: address, city, pinCode, country: user.address.country },
//         idempotencyKey,
//       });

//       if (result.error) {
//         throw new Error(result.error);
//       }
      
//       setBookingRequested(result as Booking);

//     } catch (error) {
//       setIsSubmitting(false);
//       toast({
//         title: "Booking Failed",
//         description: (error as Error).message || "Something went wrong. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   if (bookingRequested) {
//     return (
//       <div className="p-8 text-center">
//         <Send className="h-20 w-20 text-green-500 mx-auto mb-6" />
//         <h2 className="font-headline text-2xl mb-2">Booking Requested!</h2>
//         <p className="text-muted-foreground mb-6">
//           Your request for "{service.title}" has been sent to the provider. You will be notified once they accept. Check "My Bookings" for status updates.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Link href="/bookings">
//             <Button size="lg">View My Bookings</Button>
//           </Link>
//           <Link href="/all-services">
//             <Button variant="outline" size="lg">Browse More</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleBooking}>
//       <CardHeader>
//             <CardTitle className="font-headline text-2xl flex items-center"><ShoppingCart className="mr-2 h-6 w-6 text-primary"/> Book This Service</CardTitle>
//             <CardDescription>Select your preferred date and time.</CardDescription>
//         </CardHeader>
//       <CardContent className="space-y-6">
//         {!user ? (
//           <Alert>
//             <LogIn className="h-5 w-5" />
//             <AlertTitle>Please Log In</AlertTitle>
//             <AlertDescription>
//               You need an account to book this service. It's quick and easy!
//             </AlertDescription>
//           </Alert>
//         ) : dailyLimitReached ? (
//           <Alert variant="destructive">
//             <Ban className="h-5 w-5" />
//             <AlertTitle>Daily Booking Limit Reached</AlertTitle>
//             <AlertDescription>
//               You have reached your limit of 10 bookings for today. Please try again tomorrow.
//             </AlertDescription>
//           </Alert>
//         ) : (
//           <>
//              <div>
//               <Label htmlFor="date" className="text-base font-medium flex items-center mb-2"><CalendarClock className="mr-2 h-5 w-5 text-primary"/>Select Date</Label>
//                <Calendar
//                 id="date"
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1)) || day > threeMonthsFromNow}
//                 className="rounded-md border"
//               />
//             </div>
            
//             {date && (
//                 <div>
//                     <Label className="text-base font-medium flex items-center mb-2"><Clock className="mr-2 h-5 w-5 text-primary"/>Available Slots for {date.toLocaleDateString()}</Label>
//                     {isLoadingSlots ? (
//                         <div className="space-y-2">
//                             <Skeleton className="h-10 w-full" />
//                             <Skeleton className="h-10 w-full" />
//                             <Skeleton className="h-10 w-full" />
//                         </div>
//                     ) : availableSlots.length > 0 ? (
//                         <RadioGroup value={selectedTimeSlot} onValueChange={setSelectedTimeSlot} className="space-y-2">
//                             {availableSlots.map(slot => (
//                                 <Label key={slot} htmlFor={slot} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/10 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer">
//                                     <RadioGroupItem value={slot} id={slot} />
//                                     <span>{slot}</span>
//                                 </Label>
//                             ))}
//                         </RadioGroup>
//                     ) : (
//                         <p className="text-sm text-muted-foreground italic p-3 border rounded-md">No available slots for this day. Please select another date.</p>
//                     )}
//                 </div>
//             )}

//             <div>
//               <Label className="text-base font-medium flex items-center mb-2"><MapPin className="mr-2 h-5 w-5 text-primary"/>Service Address</Label>
//               <div className="space-y-2">
//                 <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address Line 1" required minLength={5} maxLength={100} />
//                 <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required minLength={2} maxLength={50} />
//                 <Input value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder="PIN/ZIP Code" required minLength={4} maxLength={10} />
//               </div>
//                <p className="text-xs text-muted-foreground mt-1">Auto-filled from your profile. You can edit if needed.</p>
//             </div>
            
//             <Alert className={isFreeTransaction ? "border-green-500 bg-green-50 dark:bg-green-900/30" : "border-blue-500 bg-blue-50 dark:bg-blue-900/30"}>
//               <Wallet className={`h-5 w-5 ${isFreeTransaction ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`} />
//               <AlertTitle className={`font-semibold ${isFreeTransaction ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
//                 {isFreeTransaction ? "This is a Free Booking Request!" : "Platform Fee on Acceptance"}
//               </AlertTitle>
//               <AlertDescription className={`${isFreeTransaction ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
//                  {isFreeTransaction 
//                    ? `You have ${FREE_TRANSACTION_LIMIT - user.freeTransactionsUsed} free booking requests remaining.`
//                    : `A small platform fee will be deducted from your wallet if the provider accepts. Current Balance: ${currencySymbol}${user.walletBalance.toFixed(2)}`
//                  }
//               </AlertDescription>
//             </Alert>
//           </>
//         )}
//       </CardContent>
//       <CardFooter>
//         {!user ? (
//           <Link href="/login" className="w-full">
//             <Button className="w-full h-12 text-lg">
//               <LogIn className="mr-2 h-5 w-5"/> Login to Book
//             </Button>
//           </Link>
//         ) : (
//           <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting || dailyLimitReached || !date || !selectedTimeSlot}>
//             {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Booking Request"}
//           </Button>
//         )}
//       </CardFooter>
//     </form>
//   );
// }




"use client";

import { useState, useEffect } from 'react';
import type { Service, UserProfile, Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Ban, LogIn, Loader2, Wallet, CalendarClock, MapPin, Send, Clock, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { createBooking, getUnavailableSlots } from '@/lib/actions/booking.actions';
import { currencySymbols } from '@/lib/constants';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '../ui/skeleton';

interface BookingFormProps {
    service: Service;
    user: UserProfile | null;
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Helper to extract number from a price string like "$50/hr" or "From ₹120"
const parsePrice = (priceDisplay: string): number => {
    const numbers = priceDisplay.match(/\d+(\.\d+)?/g);
    return numbers ? parseFloat(numbers[0]) : 0;
};

export function BookingForm({ service, user }: BookingFormProps) {
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date | undefined>();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  const [address, setAddress] = useState(user?.address.line1 || '');
  const [city, setCity] = useState(user?.address.city || '');
  const [pinCode, setPinCode] = useState(user?.address.pinCode || '');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRequested, setBookingRequested] = useState<Booking | null>(null);

  const dailyLimitReached = user ? (user.dailyBookings ?? 0) >= 10 : false;
  const currencySymbol = user ? (currencySymbols[user.currency] || user.currency) : '$';

  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  useEffect(() => {
    if (!date || !service) return;

    const fetchAndSetAvailableSlots = async () => {
      setIsLoadingSlots(true);
      const dayName = dayNames[date.getDay()];
      
      let potentialSlots = service.timeSlots
        .filter(slot => slot.startsWith(dayName))
        .map(slot => slot.replace(dayName + ' ', ''));
        
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(date);
      selectedDate.setHours(0,0,0,0);

      if (selectedDate.getTime() === today.getTime()) {
          const currentHour = new Date().getHours();
          potentialSlots = potentialSlots.filter(slot => {
              const slotStartHour = parseInt(slot.split('-')[0].split(':')[0], 10);
              return slotStartHour > currentHour;
          });
      }

      const unavailableSlots = await getUnavailableSlots(service.id, date);
      const trulyAvailableSlots = potentialSlots.filter(slot => !unavailableSlots.includes(slot));
      
      setAvailableSlots(trulyAvailableSlots);
      setSelectedTimeSlot(''); 
      setIsLoadingSlots(false);
    };

    fetchAndSetAvailableSlots();
  }, [date, service.id, service.timeSlots]);


  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to book a service.", variant: "destructive" });
      return;
    }
    if (dailyLimitReached) {
      toast({ title: "Booking Limit Reached", description: `You cannot book more than 10 services per day.`, variant: "destructive" });
      return;
    }
    if (!selectedTimeSlot || !date) {
      toast({ title: "Missing Information", description: "Please select a date and a time slot.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    try {
      const idempotencyKey = crypto.randomUUID();
      // **FIX:** Ensure servicePrice is always a number, even for older service documents
      const priceToSubmit = typeof service.price === 'number' ? service.price : parsePrice(service.priceDisplay);

      const result = await createBooking({
        serviceId: service.id,
        providerId: service.userId,
        bookedByUserId: user.id,
        serviceDate: date,
        timeSlot: selectedTimeSlot,
        address: { line1: address, city, pinCode, country: user.address.country },
        idempotencyKey,
        servicePrice: priceToSubmit,
      });

      if (result.error) {
        throw new Error(result.error);
      }
      
      setBookingRequested(result as Booking);

    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Booking Failed",
        description: (error as Error).message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (bookingRequested) {
    return (
      <div className="p-8 text-center">
        <Send className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h2 className="font-headline text-2xl mb-2">Booking Requested!</h2>
        <p className="text-muted-foreground mb-6">
          Your request for "{service.title}" has been sent to the provider. You will be notified once they accept. Check "My Bookings" for status updates.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/bookings">
            <Button size="lg">View My Bookings</Button>
          </Link>
          <Link href="/all-services">
            <Button variant="outline" size="lg">Browse More</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleBooking}>
      <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center"><ShoppingCart className="mr-2 h-6 w-6 text-primary"/> Book This Service</CardTitle>
            <CardDescription>Select your preferred date and time.</CardDescription>
        </CardHeader>
      <CardContent className="space-y-6">
        {!user ? (
          <Alert>
            <LogIn className="h-5 w-5" />
            <AlertTitle>Please Log In</AlertTitle>
            <AlertDescription>
              You need an account to book this service. It's quick and easy!
            </AlertDescription>
          </Alert>
        ) : dailyLimitReached ? (
          <Alert variant="destructive">
            <Ban className="h-5 w-5" />
            <AlertTitle>Daily Booking Limit Reached</AlertTitle>
            <AlertDescription>
              You have reached your limit of 10 bookings for today. Please try again tomorrow.
            </AlertDescription>
          </Alert>
        ) : (
          <>
             <div>
              <Label htmlFor="date" className="text-base font-medium flex items-center mb-2"><CalendarClock className="mr-2 h-5 w-5 text-primary"/>Select Date</Label>
               <Calendar
                id="date"
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1)) || day > threeMonthsFromNow}
                className="rounded-md border"
              />
            </div>
            
            {date && (
                <div>
                    <Label className="text-base font-medium flex items-center mb-2"><Clock className="mr-2 h-5 w-5 text-primary"/>Available Slots for {date.toLocaleDateString()}</Label>
                    {isLoadingSlots ? (
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ) : availableSlots.length > 0 ? (
                        <RadioGroup value={selectedTimeSlot} onValueChange={setSelectedTimeSlot} className="space-y-2">
                            {availableSlots.map(slot => (
                                <Label key={slot} htmlFor={slot} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/10 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all cursor-pointer">
                                    <RadioGroupItem value={slot} id={slot} />
                                    <span>{slot}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                    ) : (
                        <p className="text-sm text-muted-foreground italic p-3 border rounded-md">No available slots for this day. Please select another date.</p>
                    )}
                </div>
            )}

            <div>
              <Label className="text-base font-medium flex items-center mb-2"><MapPin className="mr-2 h-5 w-5 text-primary"/>Service Address</Label>
              <div className="space-y-2">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address Line 1" required minLength={5} maxLength={100} />
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required minLength={2} maxLength={50} />
                <Input value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder="PIN/ZIP Code" required minLength={4} maxLength={10} />
              </div>
               <p className="text-xs text-muted-foreground mt-1">Auto-filled from your profile. You can edit if needed.</p>
            </div>
            
            <Alert className="border-green-500 bg-green-50 dark:bg-green-900/30">
              <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertTitle className="font-semibold text-green-700 dark:text-green-300">
                Booking is Free!
              </AlertTitle>
              <AlertDescription className="text-green-600 dark:text-green-400">
                 There are no platform fees for booking a service. You only pay the provider directly for their work.
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
      <CardFooter>
        {!user ? (
          <Link href="/login" className="w-full">
            <Button className="w-full h-12 text-lg">
              <LogIn className="mr-2 h-5 w-5"/> Login to Book
            </Button>
          </Link>
        ) : (
          <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting || dailyLimitReached || !date || !selectedTimeSlot}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Booking Request"}
          </Button>
        )}
      </CardFooter>
    </form>
  );
}
