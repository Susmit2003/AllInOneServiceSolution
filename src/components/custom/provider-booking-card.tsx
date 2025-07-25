
// // "use client";

// // import { useState } from 'react';
// // import type { Booking } from '@/types';
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { Button } from '@/components/ui/button';
// // import { Star, CalendarDays, Clock, MapPin, MessageSquare, Loader2, KeyRound, Play, CheckCircle, User, Info, Ban, Check, X } from 'lucide-react';
// // import { RatingStars } from '@/components/custom/rating-stars';
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
// // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Label } from '@/components/ui/label';
// // import { useToast } from '@/hooks/use-toast';
// // import { useRouter } from 'next/navigation';
// // import { verifyAndStartService, completeService, addProviderFeedback, acceptBooking, declineBooking, markAsIncomplete } from '@/lib/actions/booking.actions';

// // interface ProviderBookingCardProps {
// //     booking: Booking;
// // }

// // export function ProviderBookingCard({ booking }: ProviderBookingCardProps) {
// //     const router = useRouter();
// //     const { toast } = useToast();
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [isDialogOpen, setIsDialogOpen] = useState(false);
    
// //     // State for modals
// //     const [verificationCode, setVerificationCode] = useState('');
// //     const [rating, setRating] = useState(0);
// //     const [reviewText, setReviewText] = useState("");

// //     const getStatusColor = (status: Booking['status']) => {
// //         switch (status) {
// //             case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
// //             case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
// //             case 'Requested': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
// //             case 'InProgress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
// //             case 'Incompleted': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
// //             case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
// //             default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
// //         }
// //     };

// //     const handleAction = async (action: () => Promise<any>, successTitle: string, successDescription: string, errorTitle: string) => {
// //         setIsLoading(true);
// //         try {
// //             const result = await action();
// //             if (result.error) throw new Error(result.error);
// //             toast({ title: successTitle, description: successDescription });
// //             router.refresh();
// //         } catch (error) {
// //             toast({ title: errorTitle, description: (error as Error).message, variant: 'destructive' });
// //         } finally {
// //             setIsLoading(false);
// //             setIsDialogOpen(false);
// //         }
// //     };
    
// //     const handleStartService = () => handleAction(
// //         async () => {
// //             if (!verificationCode.match(/^\d{6}$/)) throw new Error("Please enter the 6-digit verification code.");
// //             return verifyAndStartService({ bookingId: booking.id, verificationCode });
// //         },
// //         "Service Started!", "The service is now marked as 'In Progress'.", "Verification Failed"
// //     );
    
// //     const handleMarkAsIncomplete = () => handleAction(
// //         () => markAsIncomplete(booking.id),
// //         "Service Marked Incomplete", "The service status has been updated and the user's fee refunded.", "Error Marking Incomplete"
// //     );

// //     const handleCompleteService = () => handleAction(
// //         () => completeService(booking.id),
// //         "Service Completed!", "Please leave feedback for your customer.", "Error Completing Service"
// //     );

// //     const handleSubmitFeedback = () => handleAction(
// //         async () => {
// //             if (rating === 0) throw new Error("Please provide a rating.");
// //             return addProviderFeedback({ bookingId: booking.id, rating, reviewText });
// //         },
// //         "Feedback Submitted", "Thank you for your feedback.", "Error Submitting Feedback"
// //     );

// //     const handleAcceptBooking = () => handleAction(
// //         () => acceptBooking(booking.id),
// //         "Booking Accepted", "The booking has been confirmed and the user notified.", "Error Accepting Booking"
// //     );

// //     const handleDeclineBooking = () => handleAction(
// //         () => declineBooking(booking.id),
// //         "Booking Declined", "The booking has been declined.", "Error Declining Booking"
// //     );
    
// //     const renderActions = () => {
// //         switch (booking.status) {
// //             case 'Requested':
// //                 return (
// //                      <div className="flex gap-2">
// //                         <AlertDialog>
// //                             <AlertDialogTrigger asChild><Button variant="destructive" disabled={isLoading}><X className="mr-2 h-4 w-4"/>Decline</Button></AlertDialogTrigger>
// //                             <AlertDialogContent>
// //                                 <AlertDialogHeader><AlertDialogTitle>Decline this booking?</AlertDialogTitle><AlertDialogDescription>This will cancel the user's request permanently. Are you sure?</AlertDialogDescription></AlertDialogHeader>
// //                                 <AlertDialogFooter>
// //                                     <AlertDialogCancel>Back</AlertDialogCancel>
// //                                     <AlertDialogAction onClick={handleDeclineBooking} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Decline"}</AlertDialogAction>
// //                                 </AlertDialogFooter>
// //                             </AlertDialogContent>
// //                         </AlertDialog>
// //                         <AlertDialog>
// //                             <AlertDialogTrigger asChild><Button disabled={isLoading}><Check className="mr-2 h-4 w-4"/>Accept</Button></AlertDialogTrigger>
// //                             <AlertDialogContent>
// //                                 <AlertDialogHeader><AlertDialogTitle>Accept this booking?</AlertDialogTitle><AlertDialogDescription>Accepting will confirm the booking and deduct any applicable platform fees from your wallet.</AlertDialogDescription></AlertDialogHeader>
// //                                 <AlertDialogFooter>
// //                                     <AlertDialogCancel>Cancel</AlertDialogCancel>
// //                                     <AlertDialogAction onClick={handleAcceptBooking} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Accept"}</AlertDialogAction>
// //                                 </AlertDialogFooter>
// //                             </AlertDialogContent>
// //                         </AlertDialog>
// //                     </div>
// //                 )
// //             case 'Accepted':
// //                 return (
// //                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //                         <DialogTrigger asChild><Button><Play className="mr-2 h-4 w-4" /> Start Service</Button></DialogTrigger>
// //                         <DialogContent>
// //                             <DialogHeader><DialogTitle>Enter Verification Code</DialogTitle><DialogDescription>Ask the customer for their 6-digit service code to start.</DialogDescription></DialogHeader>
// //                             <div className="py-4 space-y-2">
// //                                 <Label htmlFor="code">Service Code</Label>
// //                                 <Input id="code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} maxLength={6} placeholder="_ _ _ _ _ _" className="text-center tracking-[0.5em] font-mono text-lg h-12" />
// //                             </div>
// //                             <DialogFooter>
// //                                 <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
// //                                 <Button onClick={handleStartService} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Verify & Start"}</Button>
// //                             </DialogFooter>
// //                         </DialogContent>
// //                     </Dialog>
// //                 );
// //             case 'InProgress':
// //                 return (
// //                      <div className="flex gap-2">
// //                         <AlertDialog>
// //                             <AlertDialogTrigger asChild><Button variant="destructive" disabled={isLoading}><Ban className="mr-2 h-4 w-4" /> Incomplete</Button></AlertDialogTrigger>
// //                             <AlertDialogContent>
// //                                 <AlertDialogHeader><AlertDialogTitle>Mark as Incomplete?</AlertDialogTitle><AlertDialogDescription>This will end the service and refund the user's platform fee. Use this if the service could not be finished.</AlertDialogDescription></AlertDialogHeader>
// //                                 <AlertDialogFooter>
// //                                     <AlertDialogCancel>Back</AlertDialogCancel>
// //                                     <AlertDialogAction onClick={handleMarkAsIncomplete} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Mark Incomplete"}</AlertDialogAction>
// //                                 </AlertDialogFooter>
// //                             </AlertDialogContent>
// //                         </AlertDialog>
// //                         <AlertDialog>
// //                             <AlertDialogTrigger asChild><Button disabled={isLoading}><CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete</Button></AlertDialogTrigger>
// //                             <AlertDialogContent>
// //                                 <AlertDialogHeader><AlertDialogTitle>Complete this service?</AlertDialogTitle><AlertDialogDescription>This will mark the service as completed and allow both parties to leave feedback.</AlertDialogDescription></AlertDialogHeader>
// //                                 <AlertDialogFooter>
// //                                     <AlertDialogCancel>Cancel</AlertDialogCancel>
// //                                     <AlertDialogAction onClick={handleCompleteService}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Complete"}</AlertDialogAction>
// //                                 </AlertDialogFooter>
// //                             </AlertDialogContent>
// //                         </AlertDialog>
// //                      </div>
// //                 );
// //             case 'Completed':
// //                 return booking.providerFeedback ? (
// //                     <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Feedback Submitted</div>
// //                 ) : (
// //                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //                         <DialogTrigger asChild><Button variant="outline"><Star className="mr-2 h-4 w-4" /> Leave Feedback</Button></DialogTrigger>
// //                         <DialogContent>
// //                             <DialogHeader><DialogTitle>Rate Your Experience</DialogTitle><DialogDescription>Provide feedback for {booking.bookedByUserName}.</DialogDescription></DialogHeader>
// //                              <div className="py-4 space-y-4">
// //                                 <div><Label className="text-base mb-2 block text-center">User Rating</Label><div className="flex justify-center"><RatingStars rating={rating} onRatingChange={setRating} interactive size={32} /></div></div>
// //                                 <div><Label htmlFor="reviewText" className="text-base">Comments (Optional)</Label><Textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Add any comments about the interaction..." /></div>
// //                             </div>
// //                             <DialogFooter>
// //                                 <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
// //                                 <Button onClick={handleSubmitFeedback} disabled={isLoading || rating === 0}>{isLoading ? <Loader2 className="animate-spin" /> : "Submit Feedback"}</Button>
// //                             </DialogFooter>
// //                         </DialogContent>
// //                     </Dialog>
// //                 );
// //             default: return null;
// //         }
// //     }

// //     return (
// //         <Card className={`shadow-lg overflow-hidden ${booking.status === 'Cancelled' || booking.status === 'Incompleted' ? 'opacity-70 bg-muted/30' : ''}`}>
// //             <CardHeader className="bg-secondary/20 p-4 md:p-6">
// //                 <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
// //                     <CardTitle className="font-headline text-xl md:text-2xl">{booking.serviceTitle}</CardTitle>
// //                     <Badge className={`text-xs px-3 py-1 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
// //                 </div>
// //                 <CardDescription className="text-sm mt-1 flex items-center">
// //                     <User className="h-4 w-4 mr-2" /> Booked by: {booking.bookedByUserName}
// //                 </CardDescription>
// //                 {booking.status === 'Cancelled' && booking.cancelledBy && (
// //                      <CardDescription className="text-sm text-red-500 flex items-center">
// //                         <Info className="h-4 w-4 mr-2" /> Cancelled by {booking.cancelledBy === 'provider' ? 'You' : 'the User'} on {new Date(booking.cancelledAt!).toLocaleDateString()}
// //                     </CardDescription>
// //                 )}
// //             </CardHeader>
// //             <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
// //                 <div className="space-y-1">
// //                     <p className="flex items-center text-sm"><CalendarDays className="h-4 w-4 mr-2 text-primary" /> Date: {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'Not Specified'}</p>
// //                     <p className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-primary" /> Time: {booking.timeSlot}</p>
// //                 </div>
// //                 <div className="space-y-1">
// //                      <p className="flex items-start text-sm"><MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" /> Address: {booking.address.line1}, {booking.address.city}, {booking.address.pinCode}</p>
// //                 </div>
// //                 {booking.userFeedback && (
// //                     <div className="md:col-span-2 pt-4 border-t">
// //                         <h4 className="text-sm font-semibold mb-2">User's Feedback</h4>
// //                         <RatingStars rating={booking.userFeedback.stars} size={16} />
// //                         {booking.userFeedback.text && <p className="text-sm text-muted-foreground mt-2 italic">"{booking.userFeedback.text}"</p>}
// //                     </div>
// //                 )}
// //             </CardContent>
// //             <CardFooter className="bg-secondary/10 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
// //                  <Button variant="ghost" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Contact Customer</Button>
// //                  <div className="flex-1 text-right">
// //                     {renderActions()}
// //                  </div>
// //             </CardFooter>
// //         </Card>
// //     )
// // }




// "use client";

// import { useState } from 'react';
// import type { Booking } from '@/types';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Star, CalendarDays, Clock, MapPin, MessageSquare, Loader2, KeyRound, Play, CheckCircle, User, Info, Ban, Check, X } from 'lucide-react';
// import { RatingStars } from '@/components/custom/rating-stars';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import { useRouter } from 'next/navigation';
// import { verifyAndStartService, completeService, addProviderFeedback, acceptBooking, declineBooking, markAsIncomplete } from '@/lib/actions/booking.actions';
// import { useAuth } from '@/context/auth-context';
// import { PROVIDER_PLATFORM_FEE_PERCENTAGE } from '@/lib/constants';
// import Link from 'next/link';

// interface ProviderBookingCardProps {
//     booking: Booking;
// }

// export function ProviderBookingCard({ booking }: ProviderBookingCardProps) {
//     const router = useRouter();
//     const { toast } = useToast();
//     const { currentUser } = useAuth();
//     const [isLoading, setIsLoading] = useState(false);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
    
//     const [verificationCode, setVerificationCode] = useState('');
//     const [rating, setRating] = useState(0);
//     const [reviewText, setReviewText] = useState("");

//     const isFreeBooking = (currentUser?.monthlyFreeBookings ?? 0) > 0;
//     const platformFee = (booking.servicePrice || 0) * PROVIDER_PLATFORM_FEE_PERCENTAGE;
//     const requiredBalance = (booking.servicePrice || 0) * 0.10;
//     const hasSufficientBalance = (currentUser?.walletBalance ?? 0) >= requiredBalance;

//     const getStatusColor = (status: Booking['status']) => {
//         switch (status) {
//             case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//             case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
//             case 'Requested': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
//             case 'InProgress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
//             case 'Incompleted': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
//             case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
//             default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//         }
//     };

//     const handleAction = async (action: () => Promise<any>, successTitle: string, successDescription: string, errorTitle: string) => {
//         setIsLoading(true);
//         try {
//             const result = await action();
//             if (result.error) throw new Error(result.error);
//             toast({ title: successTitle, description: successDescription });
//             router.refresh();
//         } catch (error) {
//             toast({ title: errorTitle, description: (error as Error).message, variant: 'destructive' });
//         } finally {
//             setIsLoading(false);
//             setIsDialogOpen(false);
//         }
//     };
    
//     const handleStartService = () => handleAction(
//         async () => {
//             if (!verificationCode.match(/^\d{6}$/)) throw new Error("Please enter the 6-digit verification code.");
//             return verifyAndStartService({ bookingId: booking.id, verificationCode });
//         },
//         "Service Started!", "The service is now marked as 'In Progress'.", "Verification Failed"
//     );
    
//     const handleMarkAsIncomplete = () => handleAction(
//         () => markAsIncomplete(booking.id),
//         "Service Marked Incomplete", "The service status has been updated and the user's fee refunded.", "Error Marking Incomplete"
//     );

//     const handleCompleteService = () => handleAction(
//         () => completeService(booking.id),
//         "Service Completed!", "Please leave feedback for your customer.", "Error Completing Service"
//     );

//     const handleSubmitFeedback = () => handleAction(
//         async () => {
//             if (rating === 0) throw new Error("Please provide a rating.");
//             return addProviderFeedback({ bookingId: booking.id, rating, reviewText });
//         },
//         "Feedback Submitted", "Thank you for your feedback.", "Error Submitting Feedback"
//     );

//     const handleAcceptBooking = () => handleAction(
//         () => acceptBooking(booking.id),
//         "Booking Accepted", "The booking has been confirmed and the user notified.", "Error Accepting Booking"
//     );

//     const handleDeclineBooking = () => handleAction(
//         () => declineBooking(booking.id),
//         "Booking Declined", "The booking has been declined.", "Error Declining Booking"
//     );
    
//     const renderActions = () => {
//         switch (booking.status) {
//             case 'Requested':
//                 const canAccept = isFreeBooking || hasSufficientBalance;
//                 return (
//                      <div className="flex flex-col sm:flex-row gap-2 items-center">
//                         {!canAccept && (
//                             <div className="text-xs text-destructive text-right">
//                                 <p>Min. {requiredBalance.toFixed(2)} {booking.currency} required in wallet.</p>
//                                 <Link href="/wallet" className="underline">Top up now</Link>
//                             </div>
//                         )}
//                         <div className="flex gap-2">
//                             <AlertDialog>
//                                 <AlertDialogTrigger asChild><Button variant="destructive" disabled={isLoading}><X className="mr-2 h-4 w-4"/>Decline</Button></AlertDialogTrigger>
//                                 <AlertDialogContent>
//                                     <AlertDialogHeader><AlertDialogTitle>Decline this booking?</AlertDialogTitle><AlertDialogDescription>This will cancel the user's request permanently. Are you sure?</AlertDialogDescription></AlertDialogHeader>
//                                     <AlertDialogFooter>
//                                         <AlertDialogCancel>Back</AlertDialogCancel>
//                                         <AlertDialogAction onClick={handleDeclineBooking} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Decline"}</AlertDialogAction>
//                                     </AlertDialogFooter>
//                                 </AlertDialogContent>
//                             </AlertDialog>
//                             <AlertDialog>
//                                 <AlertDialogTrigger asChild><Button disabled={isLoading || !canAccept}><Check className="mr-2 h-4 w-4"/>Accept</Button></AlertDialogTrigger>
//                                 <AlertDialogContent>
//                                     <AlertDialogHeader><AlertDialogTitle>Accept this booking?</AlertDialogTitle>
//                                     <AlertDialogDescription>
//                                         {isFreeBooking 
//                                             ? `This is a free booking acceptance. You have ${currentUser?.monthlyFreeBookings} left this month.`
//                                             : `A platform fee of ${platformFee.toFixed(2)} ${booking.currency} will be deducted from your wallet.`
//                                         }
//                                     </AlertDialogDescription>
//                                     </AlertDialogHeader>
//                                     <AlertDialogFooter>
//                                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                         <AlertDialogAction onClick={handleAcceptBooking} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Accept"}</AlertDialogAction>
//                                     </AlertDialogFooter>
//                                 </AlertDialogContent>
//                             </AlertDialog>
//                         </div>
//                     </div>
//                 )
//             case 'Accepted':
//                 return (
//                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                         <DialogTrigger asChild><Button><Play className="mr-2 h-4 w-4" /> Start Service</Button></DialogTrigger>
//                         <DialogContent>
//                             <DialogHeader><DialogTitle>Enter Verification Code</DialogTitle><DialogDescription>Ask the customer for their 6-digit service code to start.</DialogDescription></DialogHeader>
//                             <div className="py-4 space-y-2">
//                                 <Label htmlFor="code">Service Code</Label>
//                                 <Input id="code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} maxLength={6} placeholder="_ _ _ _ _ _" className="text-center tracking-[0.5em] font-mono text-lg h-12" />
//                             </div>
//                             <DialogFooter>
//                                 <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
//                                 <Button onClick={handleStartService} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Verify & Start"}</Button>
//                             </DialogFooter>
//                         </DialogContent>
//                     </Dialog>
//                 );
//             case 'InProgress':
//                 return (
//                      <div className="flex gap-2">
//                         <AlertDialog>
//                             <AlertDialogTrigger asChild><Button variant="destructive" disabled={isLoading}><Ban className="mr-2 h-4 w-4" /> Incomplete</Button></AlertDialogTrigger>
//                             <AlertDialogContent>
//                                 <AlertDialogHeader><AlertDialogTitle>Mark as Incomplete?</AlertDialogTitle><AlertDialogDescription>This will end the service and refund the user's platform fee. Use this if the service could not be finished.</AlertDialogDescription></AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                     <AlertDialogCancel>Back</AlertDialogCancel>
//                                     <AlertDialogAction onClick={handleMarkAsIncomplete} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Mark Incomplete"}</AlertDialogAction>
//                                 </AlertDialogFooter>
//                             </AlertDialogContent>
//                         </AlertDialog>
//                         <AlertDialog>
//                             <AlertDialogTrigger asChild><Button disabled={isLoading}><CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete</Button></AlertDialogTrigger>
//                             <AlertDialogContent>
//                                 <AlertDialogHeader><AlertDialogTitle>Complete this service?</AlertDialogTitle><AlertDialogDescription>This will mark the service as completed and allow both parties to leave feedback.</AlertDialogDescription></AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                     <AlertDialogAction onClick={handleCompleteService}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Complete"}</AlertDialogAction>
//                                 </AlertDialogFooter>
//                             </AlertDialogContent>
//                         </AlertDialog>
//                      </div>
//                 );
//             case 'Completed':
//                 return booking.providerFeedback ? (
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Feedback Submitted</div>
//                 ) : (
//                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                         <DialogTrigger asChild><Button variant="outline"><Star className="mr-2 h-4 w-4" /> Leave Feedback</Button></DialogTrigger>
//                         <DialogContent>
//                             <DialogHeader><DialogTitle>Rate Your Experience</DialogTitle><DialogDescription>Provide feedback for {booking.bookedByUserName}.</DialogDescription></DialogHeader>
//                              <div className="py-4 space-y-4">
//                                 <div><Label className="text-base mb-2 block text-center">User Rating</Label><div className="flex justify-center"><RatingStars rating={rating} onRatingChange={setRating} interactive size={32} /></div></div>
//                                 <div><Label htmlFor="reviewText" className="text-base">Comments (Optional)</Label><Textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Add any comments about the interaction..." /></div>
//                             </div>
//                             <DialogFooter>
//                                 <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
//                                 <Button onClick={handleSubmitFeedback} disabled={isLoading || rating === 0}>{isLoading ? <Loader2 className="animate-spin" /> : "Submit Feedback"}</Button>
//                             </DialogFooter>
//                         </DialogContent>
//                     </Dialog>
//                 );
//             default: return null;
//         }
//     }

//     return (
//         <Card className={`shadow-lg overflow-hidden ${booking.status === 'Cancelled' || booking.status === 'Incompleted' ? 'opacity-70 bg-muted/30' : ''}`}>
//             <CardHeader className="bg-secondary/20 p-4 md:p-6">
//                 <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
//                     <CardTitle className="font-headline text-xl md:text-2xl">{booking.serviceTitle}</CardTitle>
//                     <Badge className={`text-xs px-3 py-1 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
//                 </div>
//                 <CardDescription className="text-sm mt-1 flex items-center">
//                     <User className="h-4 w-4 mr-2" /> Booked by: {booking.bookedByUserName}
//                 </CardDescription>
//                 {booking.status === 'Cancelled' && booking.cancelledBy && (
//                      <CardDescription className="text-sm text-red-500 flex items-center">
//                         <Info className="h-4 w-4 mr-2" /> Cancelled by {booking.cancelledBy === 'provider' ? 'You' : 'the User'} on {new Date(booking.cancelledAt!).toLocaleDateString()}
//                     </CardDescription>
//                 )}
//             </CardHeader>
//             <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
//                 <div className="space-y-1">
//                     <p className="flex items-center text-sm"><CalendarDays className="h-4 w-4 mr-2 text-primary" /> Date: {booking.serviceDate ? new Date(booking.serviceDate).toLocaleDateString() : 'Not Specified'}</p>
//                     <p className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-primary" /> Time: {booking.timeSlot}</p>
//                 </div>
//                 <div className="space-y-1">
//                      <p className="flex items-start text-sm"><MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" /> Address: {booking.address.line1}, {booking.address.city}, {booking.address.pinCode}</p>
//                 </div>
//                 {booking.userFeedback && (
//                     <div className="md:col-span-2 pt-4 border-t">
//                         <h4 className="text-sm font-semibold mb-2">User's Feedback</h4>
//                         <RatingStars rating={booking.userFeedback.stars} size={16} />
//                         {booking.userFeedback.text && <p className="text-sm text-muted-foreground mt-2 italic">"{booking.userFeedback.text}"</p>}
//                     </div>
//                 )}
//             </CardContent>
//             <CardFooter className="bg-secondary/10 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
//                  <Button variant="ghost" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Contact Customer</Button>
//                  <div className="flex-1 text-right">
//                     {renderActions()}
//                  </div>
//             </CardFooter>
//         </Card>
//     )
// }










"use client";

import { useState } from 'react';
import type { Booking } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, CalendarDays, Clock, MapPin, MessageSquare, Loader2, KeyRound, Play, CheckCircle, User, Info, Ban, Check, X } from 'lucide-react';
import { RatingStars } from '@/components/custom/rating-stars';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { verifyAndStartService, completeService, addProviderFeedback, acceptBooking, declineBooking, markAsIncomplete } from '@/lib/actions/booking.actions';
import { useAuth } from '@/context/auth-context';
import { PROVIDER_PLATFORM_FEE_PERCENTAGE } from '@/lib/constants';
import Link from 'next/link';
import { FormattedDate } from './FormattedDate'; // <-- Import the new component

interface ProviderBookingCardProps {
    booking: Booking;
}

export function ProviderBookingCard({ booking }: ProviderBookingCardProps) {
    const router = useRouter();
    const { toast } = useToast();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const [verificationCode, setVerificationCode] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const isFreeBooking = (currentUser?.monthlyFreeBookings ?? 0) > 0;
    const platformFee = (booking.servicePrice || 0) * PROVIDER_PLATFORM_FEE_PERCENTAGE;
    const requiredBalance = (booking.servicePrice || 0) * 0.10;
    const hasSufficientBalance = (currentUser?.walletBalance ?? 0) >= requiredBalance;

    const getStatusColor = (status: Booking['status']) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Requested': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'InProgress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'Incompleted': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
            case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const handleAction = async (action: () => Promise<any>, successTitle: string, successDescription: string, errorTitle: string) => {
        setIsLoading(true);
        try {
            const result = await action();
            if (result.error) throw new Error(result.error);
            toast({ title: successTitle, description: successDescription });
            router.refresh();
        } catch (error) {
            toast({ title: errorTitle, description: (error as Error).message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
            setIsDialogOpen(false);
        }
    };
    
    const handleStartService = () => handleAction(
        async () => {
            if (!verificationCode.match(/^\d{6}$/)) throw new Error("Please enter the 6-digit verification code.");
            return verifyAndStartService({ bookingId: booking.id, verificationCode });
        },
        "Service Started!", "The service is now marked as 'In Progress'.", "Verification Failed"
    );
    
    const handleMarkAsIncomplete = () => handleAction(
        () => markAsIncomplete(booking.id),
        "Service Marked Incomplete", "The service status has been updated and the user's fee refunded.", "Error Marking Incomplete"
    );

    const handleCompleteService = () => handleAction(
        () => completeService(booking.id),
        "Service Completed!", "Please leave feedback for your customer.", "Error Completing Service"
    );

    const handleSubmitFeedback = () => handleAction(
        async () => {
            if (rating === 0) throw new Error("Please provide a rating.");
            return addProviderFeedback({ bookingId: booking.id, rating, reviewText });
        },
        "Feedback Submitted", "Thank you for your feedback.", "Error Submitting Feedback"
    );

    const handleAcceptBooking = () => handleAction(
        () => acceptBooking(booking.id),
        "Booking Accepted", "The booking has been confirmed and the user notified.", "Error Accepting Booking"
    );

    const handleDeclineBooking = () => handleAction(
        () => declineBooking(booking.id),
        "Booking Declined", "The booking has been declined.", "Error Declining Booking"
    );
    
    const renderActions = () => {
        switch (booking.status) {
            case 'Requested':
                const canAccept = isFreeBooking || hasSufficientBalance;
                return (
                     <div className="flex flex-col sm:flex-row gap-2 items-center">
                        {!canAccept && (
                            <div className="text-xs text-destructive text-right">
                                <p>Min. {requiredBalance.toFixed(2)} {booking.currency} required in wallet.</p>
                                <Link href="/wallet" className="underline">Top up now</Link>
                            </div>
                        )}
                        <div className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="destructive" disabled={isLoading}><X className="mr-2 h-4 w-4"/>Decline</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Decline this booking?</AlertDialogTitle><AlertDialogDescription>This will cancel the user's request permanently. Are you sure?</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Back</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeclineBooking} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Decline"}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild><Button disabled={isLoading || !canAccept}><Check className="mr-2 h-4 w-4"/>Accept</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Accept this booking?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {isFreeBooking 
                                            ? `This is a free booking acceptance. You have ${currentUser?.monthlyFreeBookings} left this month.`
                                            : `A platform fee of ${platformFee.toFixed(2)} ${booking.currency} will be deducted from your wallet.`
                                        }
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleAcceptBooking} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Accept"}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                )
            case 'Accepted':
                return (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild><Button><Play className="mr-2 h-4 w-4" /> Start Service</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Enter Verification Code</DialogTitle><DialogDescription>Ask the customer for their 6-digit service code to start.</DialogDescription></DialogHeader>
                            <div className="py-4 space-y-2">
                                <Label htmlFor="code">Service Code</Label>
                                <Input id="code" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} maxLength={6} placeholder="_ _ _ _ _ _" className="text-center tracking-[0.5em] font-mono text-lg h-12" />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <Button onClick={handleStartService} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Verify & Start"}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                );
            case 'InProgress':
                return (
                     <div className="flex gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild><Button variant="destructive" disabled={isLoading}><Ban className="mr-2 h-4 w-4" /> Incomplete</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader><AlertDialogTitle>Mark as Incomplete?</AlertDialogTitle><AlertDialogDescription>This will end the service and refund the user's platform fee. Use this if the service could not be finished.</AlertDialogDescription></AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Back</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleMarkAsIncomplete} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Mark Incomplete"}</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild><Button disabled={isLoading}><CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader><AlertDialogTitle>Complete this service?</AlertDialogTitle><AlertDialogDescription>This will mark the service as completed and allow both parties to leave feedback.</AlertDialogDescription></AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleCompleteService}>{isLoading ? <Loader2 className="animate-spin" /> : "Yes, Complete"}</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                     </div>
                );
            case 'Completed':
                return booking.providerFeedback ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Feedback Submitted</div>
                ) : (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild><Button variant="outline"><Star className="mr-2 h-4 w-4" /> Leave Feedback</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Rate Your Experience</DialogTitle><DialogDescription>Provide feedback for {booking.bookedByUserName}.</DialogDescription></DialogHeader>
                             <div className="py-4 space-y-4">
                                <div><Label className="text-base mb-2 block text-center">User Rating</Label><div className="flex justify-center"><RatingStars rating={rating} onRatingChange={setRating} interactive size={32} /></div></div>
                                <div><Label htmlFor="reviewText" className="text-base">Comments (Optional)</Label><Textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Add any comments about the interaction..." /></div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <Button onClick={handleSubmitFeedback} disabled={isLoading || rating === 0}>{isLoading ? <Loader2 className="animate-spin" /> : "Submit Feedback"}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                );
            default: return null;
        }
    }

    return (
        <Card className={`shadow-lg overflow-hidden ${booking.status === 'Cancelled' || booking.status === 'Incompleted' ? 'opacity-70 bg-muted/30' : ''}`}>
            <CardHeader className="bg-secondary/20 p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                    <CardTitle className="font-headline text-xl md:text-2xl">{booking.serviceTitle}</CardTitle>
                    <Badge className={`text-xs px-3 py-1 ${getStatusColor(booking.status)}`}>{booking.status}</Badge>
                </div>
                <CardDescription className="text-sm mt-1 flex items-center">
                    <User className="h-4 w-4 mr-2" /> Booked by: {booking.bookedByUserName}
                </CardDescription>
                {booking.status === 'Cancelled' && booking.cancelledBy && (
                     <CardDescription className="text-sm text-red-500 flex items-center">
                        <Info className="h-4 w-4 mr-2" /> Cancelled by {booking.cancelledBy === 'provider' ? 'You' : 'the User'} on <FormattedDate date={booking.cancelledAt} />
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div className="space-y-1">
                    <p className="flex items-center text-sm"><CalendarDays className="h-4 w-4 mr-2 text-primary" /> Date: <FormattedDate date={booking.serviceDate} /></p>
                    <p className="flex items-center text-sm"><Clock className="h-4 w-4 mr-2 text-primary" /> Time: {booking.timeSlot}</p>
                </div>
                <div className="space-y-1">
                     <p className="flex items-start text-sm"><MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" /> Address: {booking.address.line1}, {booking.address.city}, {booking.address.pinCode}</p>
                </div>
                {booking.userFeedback && (
                    <div className="md:col-span-2 pt-4 border-t">
                        <h4 className="text-sm font-semibold mb-2">User's Feedback</h4>
                        <RatingStars rating={booking.userFeedback.stars} size={16} />
                        {booking.userFeedback.text && <p className="text-sm text-muted-foreground mt-2 italic">"{booking.userFeedback.text}"</p>}
                    </div>
                )}
            </CardContent>
            <CardFooter className="bg-secondary/10 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                 <Button variant="ghost" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Contact Customer</Button>
                 <div className="flex-1 text-right">
                    {renderActions()}
                 </div>
            </CardFooter>
        </Card>
    )
}
