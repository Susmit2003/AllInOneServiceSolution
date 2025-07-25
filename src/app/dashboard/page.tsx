
// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { LayoutGrid, MapPin, ArrowRight, Wallet, Gift, PlusCircle } from 'lucide-react';
// import type { UserProfile } from '@/types';
// import { useAuth } from '@/context/auth-context';
// import { Skeleton } from '@/components/ui/skeleton';
// import { serviceHierarchy, currencySymbols, FREE_TRANSACTION_LIMIT } from '@/lib/constants';

// const allServicesCategory = { name: "All Services", query: "", icon: LayoutGrid, color: "text-slate-500", bgColor: "bg-slate-100 dark:bg-slate-900/50" };

// export default function UserDashboardPage() {
//   const router = useRouter();
//   const { currentUser, isLoading } = useAuth();
  
//   const [currentPincode, setCurrentPincode] = useState('');
//   const [tempPincode, setTempPincode] = useState('');

//   useEffect(() => {
//     if (currentUser?.address?.pinCode) {
//       setCurrentPincode(currentUser.address.pinCode);
//       setTempPincode(currentUser.address.pinCode);
//     }
//   }, [currentUser]);

//   const handlePincodeUpdate = () => {
//     if (tempPincode.match(/^\d{5,6}$/)) { // Basic US/India PIN/ZIP
//       setCurrentPincode(tempPincode);
//     } else {
//       alert("Please enter a valid PIN/ZIP code.");
//       setTempPincode(currentPincode); // Reset to current valid PIN/ZIP
//     }
//   };
  
//   if (isLoading || !currentUser) {
//     return (
//       <div className="container mx-auto py-8">
//         <div className="animate-pulse space-y-4">
//           <Card className="mb-8 p-6">
//               <Skeleton className="h-8 w-1/2" />
//               <Skeleton className="h-6 w-1/3 mt-2" />
//           </Card>
//            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
//             <Card><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
//             <Card><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
//             <Card><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
//           </div>
//           <div className="h-8 w-1/3 mb-6 mx-auto md:mx-0"></div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//             {[...Array(10)].map((_, i) => (
//               <Card key={i} className="h-48 bg-muted"><CardContent className="p-6"></CardContent></Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currencySymbol = currencySymbols[currentUser.currency] || '$';
//   const displayedCategories = [...serviceHierarchy.slice(0, 9), allServicesCategory];
//   const freeTransactionsLeft = Math.max(0, FREE_TRANSACTION_LIMIT - currentUser.freeTransactionsUsed);

//   return (
//     <div className="container mx-auto py-8">
//       <Card className="mb-8 shadow-lg p-6 bg-gradient-to-r from-primary/5 via-background to-background">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//           <div>
//             <h1 className="font-headline text-2xl md:text-3xl font-bold">Welcome, {currentUser.fullName || currentUser.username}!</h1>
//             <p className="text-muted-foreground mt-1">Quickly find services available in your area.</p>
//           </div>
//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <MapPin className="h-5 w-5 text-primary" />
//             <Input 
//               type="text" 
//               value={tempPincode}
//               onChange={(e) => setTempPincode(e.target.value)}
//               placeholder="Your PIN/ZIP code"
//               className="max-w-[180px] h-10"
//               aria-label="Current PIN/ZIP Code for service search"
//             />
//             <Button onClick={handlePincodeUpdate} size="sm" className="h-10">Update</Button>
//           </div>
//         </div>
//       </Card>
      
//       {/* Wallet and Stats Section */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
//                 <Wallet className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//                 <div className="text-2xl font-bold">{currencySymbol}{currentUser.walletBalance.toFixed(2)}</div>
//                 <p className="text-xs text-muted-foreground">
//                     Your current account balance for platform fees.
//                 </p>
//             </CardContent>
//              <CardFooter>
//                  <Link href="/wallet" className="w-full">
//                     <Button size="sm" className="w-full">
//                         <PlusCircle className="mr-2 h-4 w-4" /> View Wallet & Top Up
//                     </Button>
//                  </Link>
//             </CardFooter>
//         </Card>
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Free Transactions</CardTitle>
//                 <Gift className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//                 <div className="text-2xl font-bold">{freeTransactionsLeft} / {FREE_TRANSACTION_LIMIT}</div>
//                 <p className="text-xs text-muted-foreground">
//                     Remaining free bookings or service acceptances.
//                 </p>
//             </CardContent>
//         </Card>
//          <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Become a Provider</CardTitle>
//                 <ArrowRight className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//                <p className="text-sm text-muted-foreground">
//                     Ready to offer your skills? Set up your services and start earning.
//                 </p>
//             </CardContent>
//              <CardFooter>
//                  <Link href="/dashboard/my-services" className="w-full">
//                     <Button variant="outline" size="sm" className="w-full">Go to My Services</Button>
//                  </Link>
//             </CardFooter>
//         </Card>
//       </div>


//       <h2 className="font-headline text-2xl font-semibold mb-6 text-center md:text-left">Browse Services by Category</h2>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//         {displayedCategories.map((category) => (
//           <Link 
//             key={category.name} 
//             href={`/all-services?category=${category.query}&pincode=${currentPincode}`}
//             passHref
//           >
//             <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
//               <CardHeader className="items-center text-center p-6">
//                 <div className={`p-4 rounded-full ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
//                   <category.icon className={`h-10 w-10 ${category.color}`} />
//                 </div>
//                 <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
//               </CardHeader>
//               <CardContent className="flex-grow flex items-end justify-center p-4 pt-0">
//                  <Button variant="ghost" className="text-sm text-primary group-hover:underline">
//                   Explore <ArrowRight className="ml-1 h-4 w-4" />
//                 </Button>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </div>
//        <p className="text-xs text-muted-foreground text-center mt-8">
//         Services will be filtered based on the PIN/ZIP code: <strong className="text-foreground">{currentPincode}</strong>. You can update it above.
//       </p>
//     </div>
//   );
// }




"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LayoutGrid, MapPin, ArrowRight, Wallet, Gift, PlusCircle } from 'lucide-react';
import type { UserProfile } from '@/types';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { serviceHierarchy, currencySymbols, MONTHLY_FREE_BOOKINGS } from '@/lib/constants';

const allServicesCategory = { name: "All Services", query: "", icon: LayoutGrid, color: "text-slate-500", bgColor: "bg-slate-100 dark:bg-slate-900/50" };

export default function UserDashboardPage() {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  
  const [currentPincode, setCurrentPincode] = useState('');
  const [tempPincode, setTempPincode] = useState('');

  useEffect(() => {
    if (currentUser?.address?.pinCode) {
      setCurrentPincode(currentUser.address.pinCode);
      setTempPincode(currentUser.address.pinCode);
    }
  }, [currentUser]);

  const handlePincodeUpdate = () => {
    if (tempPincode.match(/^\d{5,6}$/)) { // Basic US/India PIN/ZIP
      setCurrentPincode(tempPincode);
    } else {
      alert("Please enter a valid PIN/ZIP code.");
      setTempPincode(currentPincode); // Reset to current valid PIN/ZIP
    }
  };
  
  if (isLoading || !currentUser) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <Card className="mb-8 p-6">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-1/3 mt-2" />
          </Card>
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
            <Card><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
            <Card><CardHeader><Skeleton className="h-24 w-full" /></CardHeader></Card>
          </div>
          <div className="h-8 w-1/3 mb-6 mx-auto md:mx-0"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="h-48 bg-muted"><CardContent className="p-6"></CardContent></Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currencySymbol = currencySymbols[currentUser.currency] || '$';
  const displayedCategories = [...serviceHierarchy.slice(0, 9), allServicesCategory];
  const freeBookingsLeft = currentUser.monthlyFreeBookings;

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 shadow-lg p-6 bg-gradient-to-r from-primary/5 via-background to-background">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold">Welcome, {currentUser.fullName || currentUser.username}!</h1>
            <p className="text-muted-foreground mt-1">Quickly find services available in your area.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <MapPin className="h-5 w-5 text-primary" />
            <Input 
              type="text" 
              value={tempPincode}
              onChange={(e) => setTempPincode(e.target.value)}
              placeholder="Your PIN/ZIP code"
              className="max-w-[180px] h-10"
              aria-label="Current PIN/ZIP Code for service search"
            />
            <Button onClick={handlePincodeUpdate} size="sm" className="h-10">Update</Button>
          </div>
        </div>
      </Card>
      
      {/* Wallet and Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{currencySymbol}{currentUser.walletBalance.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                    Your current account balance for platform fees.
                </p>
            </CardContent>
             <CardFooter>
                 <Link href="/wallet" className="w-full">
                    <Button size="sm" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> View Wallet & Top Up
                    </Button>
                 </Link>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Free Bookings Left</CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{freeBookingsLeft} / {MONTHLY_FREE_BOOKINGS}</div>
                <p className="text-xs text-muted-foreground">
                    Remaining free accepted bookings this month.
                </p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Become a Provider</CardTitle>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">
                    Ready to offer your skills? Set up your services and start earning.
                </p>
            </CardContent>
             <CardFooter>
                 <Link href="/dashboard/my-services" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">Go to My Services</Button>
                 </Link>
            </CardFooter>
        </Card>
      </div>


      <h2 className="font-headline text-2xl font-semibold mb-6 text-center md:text-left">Browse Services by Category</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayedCategories.map((category) => (
          <Link 
            key={category.name} 
            href={`/all-services?category=${category.query}&pincode=${currentPincode}`}
            passHref
          >
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
              <CardHeader className="items-center text-center p-6">
                <div className={`p-4 rounded-full ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`h-10 w-10 ${category.color}`} />
                </div>
                <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-center p-4 pt-0">
                 <Button variant="ghost" className="text-sm text-primary group-hover:underline">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
       <p className="text-xs text-muted-foreground text-center mt-8">
        Services will be filtered based on the PIN/ZIP code: <strong className="text-foreground">{currentPincode}</strong>. You can update it above.
      </p>
    </div>
  );
}
