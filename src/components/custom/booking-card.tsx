
// // "use client";

// // import { useState } from 'react';
// // import type { Booking } from '@/types';
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { Button } from '@/components/ui/button';
// // import { Star, CalendarDays, Clock, MapPin, Repeat, MessageSquare, Loader2, KeyRound, Info } from 'lucide-react';
// // import { RatingStars } from '@/components/custom/rating-stars';
// // import Link from 'next/link';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// //   DialogFooter,
// //   DialogClose
// // } from "@/components/ui/dialog";
// // import { Textarea } from '@/components/ui/textarea';
// // import { Label } from '@/components/ui/label';
// // import { useToast } from '@/hooks/use-toast';
// // import { addReview, cancelBooking } from '@/lib/actions/booking.actions';
// // import {
// //   AlertDialog,
// //   AlertDialogAction,
// //   AlertDialogCancel,
// //   AlertDialogContent,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// //   AlertDialogTrigger,
// // } from "@/components/ui/alert-dialog";
// // import { currencySymbols } from '@/lib/constants';
// // import { useRouter } from 'next/navigation';

// // interface BookingCardProps {
// //     booking: Booking;
// // }

// // export function BookingCard({ booking: initialBooking }: BookingCardProps) {
// //   const [booking, setBooking] = useState(initialBooking);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
// //   const [rating, setRating] = useState(0);
// //   const [reviewText, setReviewText] = useState("");
// //   const { toast } = useToast();
// //   const router = useRouter();

// //   const handleOpenReviewModal = () => {
// //     setRating(booking.userFeedback?.stars || 0);
// //     setReviewText(booking.userFeedback?.text || "");
// //     setIsReviewDialogOpen(true);
// //   };

// //   const handleSubmitReview = async () => {
// //     if (rating === 0) {
// //       toast({ title: "Please provide a rating.", variant: "destructive" });
// //       return;
// //     }
// //     setIsLoading(true);
    
// //     try {
// //       const updatedBooking = await addReview({ bookingId: booking.id, rating, reviewText });
// //       setBooking(updatedBooking);
// //       toast({ title: "Success", description: "Your review has been submitted." });
// //       setIsReviewDialogOpen(false);
// //     } catch (error) {
// //       toast({ title: "Error", description: "Failed to submit review.", variant: "destructive" });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleCancelBooking = async () => {
// //     setIsLoading(true);
// //     try {
// //       const result = await cancelBooking(booking.id);
// //       if(result.error) {
// //         throw new Error(result.error);
// //       }
// //       setBooking(result as Booking);
// //       toast({ title: "Booking Cancelled", description: "The booking has been successfully cancelled." });
// //       router.refresh(); // Refresh to update lists if needed
// //     } catch (error) {
// //       toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  
// //   const getStatusColor = (status: Booking['status']) => {
// //     switch (status) {
// //       case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
// //       case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
// //       case 'Requested': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
// //       case 'InProgress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
// //       case 'Incompleted': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
// //       case 'Cancelled':
// //         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
// //       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
// //     }
// //   };
  
// //   const currencySymbol = currencySymbols[booking.currency || ''] || booking.currency;
// //   const isFeePaid = booking.paymentStatus === 'fee_paid';
// //   const canLeaveReview = (booking.status === 'Completed' || booking.status === 'Incompleted') && !booking.userFeedback;
// //   const canBookAgain = (booking.status === 'Completed' || booking.status === 'Incompleted');


// //   return (
// //     <>
// //       <Card key={booking.id} className="shadow-lg overflow-hidden">
// //         <CardHeader className="bg-secondary/20 p-4 md:p-6">
// //           <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
// //             <CardTitle className="font-headline text-xl md:text-2xl">{booking.serviceTitle}</CardTitle>
// //             <Badge className={`text-xs px-3 py-1 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
// //           </div>
// //           <CardDescription className="text-sm mt-1">
// //             With: {booking.providerName}
// //             {booking.status === 'Cancelled' && booking.cancelledBy && booking.cancelledAt && (
// //               <span className="block text-red-500 mt-1">
// //                 Cancelled by {booking.cancelledBy === 'user' ? 'You' : 'Provider'} on {new Date(booking.cancelledAt).toLocaleDateString()}
// //               </span>
// //             )}
// //             {booking.status === 'Incompleted' && booking.incompletedAt && (
// //               <span className="block text-amber-600 dark:text-amber-400 mt-1">
// //                 Marked as incomplete on {new Date(booking.incompletedAt).toLocaleDateString()}
// //               </span>
// //             )}
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
// //           <div className="space-y-1">
// //             <p className="flex items-center text-sm"><CalendarDays className="h-4 w-4 mr-2 text-primary" /> Date: {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'Not Specified'}</p>
// //             <p className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-primary" /> Time: {booking.timeSlot}</p>
// //             <p className="flex items-start text-sm"><MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" /> Address: {booking.address.line1}, {booking.address.city}</p>
// //           </div>
// //           <div className="space-y-1">
// //             {isFeePaid ? <p className="text-sm">Platform Fee Paid: {currencySymbol}{booking.bookerFeePaid.toFixed(2)}</p> : <p className="text-sm">Platform Fee: Pending</p>}
// //             <p className="text-sm">Payment Status: <span className="font-medium capitalize">{booking.paymentStatus.replace('_', ' ')}</span></p>
// //             <p className="text-sm text-muted-foreground">Requested on: {new Date(booking.requestedAt).toLocaleDateString()}</p>
// //           </div>
// //           {booking.status === 'Accepted' && (
// //             <div className="md:col-span-2 mt-2">
// //                 <div className="bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg p-3 text-center">
// //                     <Label className="text-sm font-semibold text-primary-foreground/80 flex items-center justify-center mb-1"><KeyRound className="mr-2 h-4 w-4"/>Service Verification Code</Label>
// //                     <p className="text-3xl font-bold tracking-widest text-primary font-mono">{booking.serviceVerificationCode}</p>
// //                     <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Info className="h-3 w-3" />Share this with the provider upon arrival.</p>
// //                 </div>
// //             </div>
// //           )}
// //         </CardContent>
// //         <CardFooter className="bg-secondary/10 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
// //           <div className="w-full sm:w-auto">
// //             {booking.userFeedback ? (
// //               <RatingStars rating={booking.userFeedback.stars} totalReviews={0} size={20} />
// //             ) : canLeaveReview ? (
// //               <Button variant="outline" onClick={handleOpenReviewModal}>
// //                 <Star className="mr-2 h-4 w-4" /> Rate Service
// //               </Button>
// //             ) : null}
// //           </div>
// //           <div className="flex gap-2 w-full sm:w-auto">
// //             <Button variant="ghost" size="sm" className="w-full sm:w-auto">
// //               <MessageSquare className="mr-2 h-4 w-4" /> Contact Provider
// //             </Button>
// //             {(booking.status === 'Accepted' || booking.status === 'Requested') && (
// //                <AlertDialog>
// //                   <AlertDialogTrigger asChild>
// //                     <Button variant="destructive" size="sm" className="w-full sm:w-auto" disabled={isLoading}>Cancel Booking</Button>
// //                   </AlertDialogTrigger>
// //                   <AlertDialogContent>
// //                     <AlertDialogHeader>
// //                       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// //                       <AlertDialogDescription>
// //                         This will permanently cancel your booking request for "{booking.serviceTitle}". This action cannot be undone.
// //                       </AlertDialogDescription>
// //                     </AlertDialogHeader>
// //                     <AlertDialogFooter>
// //                       <AlertDialogCancel>Back</AlertDialogCancel>
// //                       <AlertDialogAction onClick={handleCancelBooking}>
// //                         {isLoading ? <Loader2 className="animate-spin" /> : "Yes, Cancel Booking"}
// //                       </AlertDialogAction>
// //                     </AlertDialogFooter>
// //                   </AlertDialogContent>
// //                 </AlertDialog>
// //             )}
// //              {canBookAgain && (
// //               <Link href={`/all-services/${booking.serviceId}/book`}>
// //                 <Button variant="outline" size="sm" className="w-full sm:w-auto">
// //                   <Repeat className="mr-2 h-4 w-4" /> Book Again
// //                 </Button>
// //               </Link>
// //             )}
// //           </div>
// //         </CardFooter>
// //       </Card>
      
// //       {/* Review Dialog */}
// //       <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
// //         <DialogContent className="sm:max-w-[425px]">
// //           <DialogHeader>
// //             <DialogTitle className="font-headline">Rate "{booking.serviceTitle}"</DialogTitle>
// //             <DialogDescription>
// //               Share your experience with {booking.providerName}.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="py-4 space-y-4">
// //             <div>
// //               <Label className="text-base mb-2 block text-center">Your Rating</Label>
// //               <div className="flex justify-center">
// //                 <RatingStars rating={rating} onRatingChange={setRating} interactive size={32} />
// //               </div>
// //             </div>
// //             <div>
// //               <Label htmlFor="reviewText" className="text-base">Your Review (Optional)</Label>
// //               <Textarea
// //                 id="reviewText"
// //                 value={reviewText}
// //                 onChange={(e) => setReviewText(e.target.value)}
// //                 placeholder="Tell us more about your experience..."
// //                 className="min-h-[100px]"
// //               />
// //             </div>
// //           </div>
// //           <DialogFooter>
// //             <DialogClose asChild>
// //                <Button type="button" variant="outline">Cancel</Button>
// //             </DialogClose>
// //             <Button type="button" onClick={handleSubmitReview} disabled={isLoading || rating === 0}>
// //               {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
// //               {isLoading ? "Submitting..." : "Submit Review"}
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }





// "use client";

// import { useState } from 'react';
// import type { Booking } from '@/types';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Star, CalendarDays, Clock, MapPin, Repeat, MessageSquare, Loader2, KeyRound, Info } from 'lucide-react';
// import { RatingStars } from '@/components/custom/rating-stars';
// import Link from 'next/link';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
//   DialogClose
// } from "@/components/ui/dialog";
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import { addReview, cancelBookingAsUser } from '@/lib/actions/booking.actions';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { currencySymbols, CUSTOMER_CANCELLATION_FEE, CANCELLATION_FEE_TO_PROVIDER } from '@/lib/constants';
// import { useRouter } from 'next/navigation';
// import { createRazorpayOrder } from '@/lib/actions/razorpay.actions';
// import { useAuth } from '@/context/auth-context';

// declare global {
//     interface Window {
//         Razorpay: any;
//     }
// }

// interface BookingCardProps {
//     booking: Booking;
// }

// export function BookingCard({ booking: initialBooking }: BookingCardProps) {
//   const [booking, setBooking] = useState(initialBooking);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const { toast } = useToast();
//   const router = useRouter();
//   const { currentUser } = useAuth();

//   const handleOpenReviewModal = () => {
//     setRating(booking.userFeedback?.stars || 0);
//     setReviewText(booking.userFeedback?.text || "");
//     setIsReviewDialogOpen(true);
//   };

//   const handleSubmitReview = async () => {
//     if (rating === 0) {
//       toast({ title: "Please provide a rating.", variant: "destructive" });
//       return;
//     }
//     setIsLoading(true);
    
//     try {
//       const updatedBooking = await addReview({ bookingId: booking.id, rating, reviewText });
//       setBooking(updatedBooking);
//       toast({ title: "Success", description: "Your review has been submitted." });
//       setIsReviewDialogOpen(false);
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to submit review.", variant: "destructive" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancellationPayment = async () => {
//     setIsLoading(true);
//     if (!currentUser) {
//         toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
//         setIsLoading(false);
//         return;
//     }
//     try {
//         const response = await createRazorpayOrder(CUSTOMER_CANCELLATION_FEE, booking.id);
//         if (response.error || !response.order || !response.key) {
//             throw new Error(response.error || "Failed to create payment order.");
//         }

//         const options = {
//             key: response.key,
//             amount: response.order.amount,
//             currency: response.order.currency,
//             name: "HandyConnect Cancellation Fee",
//             description: `Fee for cancelling booking #${booking.id.slice(-6)}`,
//             order_id: response.order.id,
//             handler: async function (res: any) {
//                 // Payment successful, now proceed with cancellation on the backend
//                 const result = await cancelBookingAsUser(booking.id, true);
//                 if (result.error) throw new Error(result.error);
                
//                 setBooking(result as Booking);
//                 toast({ title: "Booking Cancelled", description: "The booking has been cancelled and the fee paid." });
//                 router.refresh();
//             },
//             prefill: {
//                 name: currentUser?.fullName || currentUser?.username,
//                 contact: currentUser?.mobileNumber
//             },
//             theme: { color: "#64B5F6" }
//         };
        
//         const rzp = new window.Razorpay(options);
//         rzp.on('payment.failed', (res: any) => {
//             toast({ title: "Payment Failed", description: res.error.description, variant: "destructive" });
//             setIsLoading(false);
//         });
//         rzp.open();

//     } catch (error) {
//         toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
//         setIsLoading(false);
//     }
//   };
  
//   const getStatusColor = (status: Booking['status']) => {
//     switch (status) {
//       case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//       case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//       case 'Requested': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
//       case 'InProgress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
//       case 'Incompleted': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
//       case 'Cancelled':
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
//   };
  
//   const currencySymbol = currencySymbols[booking.currency || ''] || booking.currency;
//   const isFeePaid = booking.paymentStatus === 'fee_paid';
//   const canLeaveReview = (booking.status === 'Completed' || booking.status === 'Incompleted') && !booking.userFeedback;
//   const canBookAgain = (booking.status === 'Completed' || booking.status === 'Incompleted');


//   return (
//     <>
//       <Card key={booking.id} className="shadow-lg overflow-hidden">
//         <CardHeader className="bg-secondary/20 p-4 md:p-6">
//           <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
//             <CardTitle className="font-headline text-xl md:text-2xl">{booking.serviceTitle}</CardTitle>
//             <Badge className={`text-xs px-3 py-1 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
//           </div>
//           <CardDescription className="text-sm mt-1">
//             With: {booking.providerName}
//             {booking.status === 'Cancelled' && booking.cancelledBy && booking.cancelledAt && (
//               <span className="block text-red-500 mt-1">
//                 Cancelled by {booking.cancelledBy === 'user' ? 'You' : 'Provider'} on {new Date(booking.cancelledAt).toLocaleDateString()}
//               </span>
//             )}
//             {booking.status === 'Incompleted' && booking.incompletedAt && (
//               <span className="block text-amber-600 dark:text-amber-400 mt-1">
//                 Marked as incomplete on {new Date(booking.incompletedAt).toLocaleDateString()}
//               </span>
//             )}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
//           <div className="space-y-1">
//             <p className="flex items-center text-sm"><CalendarDays className="h-4 w-4 mr-2 text-primary" /> Date: {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'Not Specified'}</p>
//             <p className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-primary" /> Time: {booking.timeSlot}</p>
//             <p className="flex items-start text-sm"><MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" /> Address: {booking.address.line1}, {booking.address.city}</p>
//           </div>
//           <div className="space-y-1">
//             {isFeePaid ? <p className="text-sm">Platform Fee Paid: {currencySymbol}{booking.bookerFeePaid.toFixed(2)}</p> : <p className="text-sm">Platform Fee: Pending</p>}
//             <p className="text-sm">Payment Status: <span className="font-medium capitalize">{booking.paymentStatus.replace('_', ' ')}</span></p>
//             <p className="text-sm text-muted-foreground">Requested on: {new Date(booking.requestedAt).toLocaleDateString()}</p>
//           </div>
//           {booking.status === 'Accepted' && (
//             <div className="md:col-span-2 mt-2">
//                 <div className="bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg p-3 text-center">
//                     <Label className="text-sm font-semibold text-primary-foreground/80 flex items-center justify-center mb-1"><KeyRound className="mr-2 h-4 w-4"/>Service Verification Code</Label>
//                     <p className="text-3xl font-bold tracking-widest text-primary font-mono">{booking.serviceVerificationCode}</p>
//                     <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Info className="h-3 w-3" />Share this with the provider upon arrival.</p>
//                 </div>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter className="bg-secondary/10 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
//           <div className="w-full sm:w-auto">
//             {booking.userFeedback ? (
//               <RatingStars rating={booking.userFeedback.stars} totalReviews={0} size={20} />
//             ) : canLeaveReview ? (
//               <Button variant="outline" onClick={handleOpenReviewModal}>
//                 <Star className="mr-2 h-4 w-4" /> Rate Service
//               </Button>
//             ) : null}
//           </div>
//           <div className="flex gap-2 w-full sm:w-auto">
//             <Button variant="ghost" size="sm" className="w-full sm:w-auto">
//               <MessageSquare className="mr-2 h-4 w-4" /> Contact Provider
//             </Button>
//             {(booking.status === 'Accepted') && (
//                <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="destructive" size="sm" className="w-full sm:w-auto" disabled={isLoading}>Cancel Booking</Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         A non-refundable cancellation fee of <span className="font-bold">{currencySymbol}{CUSTOMER_CANCELLATION_FEE}</span> is required. 
//                         {CANCELLATION_FEE_TO_PROVIDER} will be paid to the provider for their time.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Back</AlertDialogCancel>
//                       <AlertDialogAction onClick={handleCancellationPayment} disabled={isLoading}>
//                         {isLoading ? <Loader2 className="animate-spin" /> : `Pay & Cancel`}
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//             )}
//              {canBookAgain && (
//               <Link href={`/all-services/${booking.serviceId}/book`}>
//                 <Button variant="outline" size="sm" className="w-full sm:w-auto">
//                   <Repeat className="mr-2 h-4 w-4" /> Book Again
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </CardFooter>
//       </Card>
      
//       {/* Review Dialog */}
//       <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle className="font-headline">Rate "{booking.serviceTitle}"</DialogTitle>
//             <DialogDescription>
//               Share your experience with {booking.providerName}.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="py-4 space-y-4">
//             <div>
//               <Label className="text-base mb-2 block text-center">Your Rating</Label>
//               <div className="flex justify-center">
//                 <RatingStars rating={rating} onRatingChange={setRating} interactive size={32} />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="reviewText" className="text-base">Your Review (Optional)</Label>
//               <Textarea
//                 id="reviewText"
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 placeholder="Tell us more about your experience..."
//                 className="min-h-[100px]"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//                <Button type="button" variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="button" onClick={handleSubmitReview} disabled={isLoading || rating === 0}>
//               {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
//               {isLoading ? "Submitting..." : "Submit Review"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
"use client";

import { useState } from 'react';
import type { Booking } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, CalendarDays, Clock, MapPin, Repeat, MessageSquare, Loader2, KeyRound, Info } from 'lucide-react';
import { RatingStars } from '@/components/custom/rating-stars';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addReview, cancelBookingAsUser } from '@/lib/actions/booking.actions';
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
import { currencySymbols, CUSTOMER_CANCELLATION_FEE, CANCELLATION_FEE_TO_PROVIDER } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { createRazorpayOrder } from '@/lib/actions/razorpay.actions';
import { useAuth } from '@/context/auth-context';
import { FormattedDate } from './FormattedDate'; // <-- Import the new component

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface BookingCardProps {
    booking: Booking;
}

export function BookingCard({ booking: initialBooking }: BookingCardProps) {
  const [booking, setBooking] = useState(initialBooking);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { currentUser } = useAuth();

  const handleOpenReviewModal = () => {
    setRating(booking.userFeedback?.stars || 0);
    setReviewText(booking.userFeedback?.text || "");
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({ title: "Please provide a rating.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    
    try {
      const updatedBooking = await addReview({ bookingId: booking.id, rating, reviewText });
      setBooking(updatedBooking);
      toast({ title: "Success", description: "Your review has been submitted." });
      setIsReviewDialogOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit review.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancellationPayment = async () => {
    setIsLoading(true);
    if (!currentUser) {
        toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
        setIsLoading(false);
        return;
    }
    try {
        const response = await createRazorpayOrder(CUSTOMER_CANCELLATION_FEE, booking.id);
        if (response.error || !response.order || !response.key) {
            throw new Error(response.error || "Failed to create payment order.");
        }

        const options = {
            key: response.key,
            amount: response.order.amount,
            currency: response.order.currency,
            name: "HandyConnect Cancellation Fee",
            description: `Fee for cancelling booking #${booking.id.slice(-6)}`,
            order_id: response.order.id,
            handler: async function (res: any) {
                const result = await cancelBookingAsUser(booking.id, true);
                if (result.error) throw new Error(result.error);
                
                setBooking(result as Booking);
                toast({ title: "Booking Cancelled", description: "The booking has been cancelled and the fee paid." });
                router.refresh();
            },
            prefill: {
                name: currentUser?.fullName || currentUser?.username,
                contact: currentUser?.mobileNumber
            },
            theme: { color: "#64B5F6" }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (res: any) => {
            toast({ title: "Payment Failed", description: res.error.description, variant: "destructive" });
            setIsLoading(false);
        });
        rzp.open();

    } catch (error) {
        toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
        setIsLoading(false);
    }
  };
  
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Requested': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'InProgress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Incompleted': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const currencySymbol = currencySymbols[booking.currency || ''] || booking.currency;
  const isFeePaid = booking.paymentStatus === 'fee_paid';
  const canLeaveReview = (booking.status === 'Completed' || booking.status === 'Incompleted') && !booking.userFeedback;
  const canBookAgain = (booking.status === 'Completed' || booking.status === 'Incompleted');


  return (
    <>
      <Card key={booking.id} className="shadow-lg overflow-hidden">
        <CardHeader className="bg-secondary/20 p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <CardTitle className="font-headline text-xl md:text-2xl">{booking.serviceTitle}</CardTitle>
            <Badge className={`text-xs px-3 py-1 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
          </div>
          <CardDescription className="text-sm mt-1">
            With: {booking.providerName}
            {booking.status === 'Cancelled' && booking.cancelledBy && booking.cancelledAt && (
              <span className="block text-red-500 mt-1">
                Cancelled by {booking.cancelledBy === 'user' ? 'You' : 'Provider'} on <FormattedDate date={booking.cancelledAt} />
              </span>
            )}
            {booking.status === 'Incompleted' && booking.incompletedAt && (
              <span className="block text-amber-600 dark:text-amber-400 mt-1">
                Marked as incomplete on <FormattedDate date={booking.incompletedAt} />
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          <div className="space-y-1">
            <p className="flex items-center text-sm"><CalendarDays className="h-4 w-4 mr-2 text-primary" /> Date: <FormattedDate date={booking.serviceDate} /></p>
            <p className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-primary" /> Time: {booking.timeSlot}</p>
            <p className="flex items-start text-sm"><MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" /> Address: {booking.address.line1}, {booking.address.city}</p>
          </div>
          <div className="space-y-1">
            {isFeePaid ? <p className="text-sm">Platform Fee Paid: {currencySymbol}{booking.bookerFeePaid.toFixed(2)}</p> : <p className="text-sm">Platform Fee: Pending</p>}
            <p className="text-sm">Payment Status: <span className="font-medium capitalize">{booking.paymentStatus.replace('_', ' ')}</span></p>
            <p className="text-sm text-muted-foreground">Requested on: <FormattedDate date={booking.requestedAt} /></p>
          </div>
          {booking.status === 'Accepted' && (
            <div className="md:col-span-2 mt-2">
                <div className="bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg p-3 text-center">
                    <Label className="text-sm font-semibold text-primary-foreground/80 flex items-center justify-center mb-1"><KeyRound className="mr-2 h-4 w-4"/>Service Verification Code</Label>
                    <p className="text-3xl font-bold tracking-widest text-primary font-mono">{booking.serviceVerificationCode}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Info className="h-3 w-3" />Share this with the provider upon arrival.</p>
                </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-secondary/10 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="w-full sm:w-auto">
            {booking.userFeedback ? (
              <RatingStars rating={booking.userFeedback.stars} totalReviews={0} size={20} />
            ) : canLeaveReview ? (
              <Button variant="outline" onClick={handleOpenReviewModal}>
                <Star className="mr-2 h-4 w-4" /> Rate Service
              </Button>
            ) : null}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              <MessageSquare className="mr-2 h-4 w-4" /> Contact Provider
            </Button>
            {(booking.status === 'Accepted') && (
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="w-full sm:w-auto" disabled={isLoading}>Cancel Booking</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
                      <AlertDialogDescription>
                        A non-refundable cancellation fee of <span className="font-bold">{currencySymbol}{CUSTOMER_CANCELLATION_FEE}</span> is required. 
                        {CANCELLATION_FEE_TO_PROVIDER} will be paid to the provider for their time.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Back</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancellationPayment} disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : `Pay & Cancel`}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            )}
             {canBookAgain && (
              <Link href={`/all-services/${booking.serviceId}/book`}>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Repeat className="mr-2 h-4 w-4" /> Book Again
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">Rate "{booking.serviceTitle}"</DialogTitle>
            <DialogDescription>
              Share your experience with {booking.providerName}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label className="text-base mb-2 block text-center">Your Rating</Label>
              <div className="flex justify-center">
                <RatingStars rating={rating} onRatingChange={setRating} interactive size={32} />
              </div>
            </div>
            <div>
              <Label htmlFor="reviewText" className="text-base">Your Review (Optional)</Label>
              <Textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us more about your experience..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
               <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSubmitReview} disabled={isLoading || rating === 0}>
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
