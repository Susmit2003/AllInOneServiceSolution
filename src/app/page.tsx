
// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { ArrowRight, Search, Zap, ShieldCheck, UserCheck, Sparkles, Paintbrush, Wrench, Stethoscope } from "lucide-react";
// // import Link from "next/link";

// // // Data for sections
// // const popularServices = [
// //   { name: "Cleaner", icon: Sparkles, query: "cleaner", color: "text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/50" },
// //   { name: "Appliance Repair", icon: Wrench, query: "appliance%20repair", color: "text-gray-500", bgColor: "bg-gray-100 dark:bg-gray-900/50" },
// //   { name: "Painting", icon: Paintbrush, query: "painting", color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
// //   { name: "Healthcare", icon: Stethoscope, query: "healthcare", color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/50" },
// // ];

// // const whyChooseUsFeatures = [
// //   {
// //     icon: UserCheck,
// //     title: "Verified Professionals",
// //     description: "Every provider is vetted for skill and reliability, ensuring you get top-quality service every time.",
// //   },
// //   {
// //     icon: ShieldCheck,
// //     title: "Secure & Transparent",
// //     description: "Enjoy secure payments, clear pricing, and direct communication. No hidden fees, no surprises.",
// //   },
// //   {
// //     icon: Zap,
// //     title: "Fast & Convenient",
// //     description: "Find and book services in minutes. Our platform is designed to save you time and effort.",
// //   },
// // ];

// // const howItWorksSteps = [
// //     {
// //       title: "Discover Services",
// //       description: "Enter your PIN/ZIP code and browse a wide range of services offered by skilled local professionals in your area.",
// //     },
// //     {
// //       title: "Book Instantly",
// //       description: "Select your preferred provider, choose a convenient time slot that fits your schedule, and confirm your booking in minutes.",
// //     },
// //     {
// //       title: "Get It Done",
// //       description: "A verified and trusted professional will arrive on time to complete the job to your satisfaction. Relax and enjoy quality service!",
// //     },
// //   ];

// // // Main component
// // export default function HomePage() {
// //   return (
// //     <div className="flex flex-col bg-background text-foreground">

// //       {/* Hero Section */}
// //       <section className="w-full bg-gradient-to-b from-background via-blue-50/50 to-background dark:via-blue-950/20">
// //         <div className="container mx-auto px-4 md:px-6">
// //           <div className="py-20 md:py-32 text-center">
// //             <div>
// //               <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
// //                 Your Home, <span className="text-primary">Expertly Handled.</span>
// //               </h1>
// //               <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
// //                 HandyConnect makes it effortless to find trusted local professionals for all your home service needs. Quick, reliable, and just a click away.
// //               </p>
// //               <form action="/all-services" method="GET" className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-2">
// //                 <Input
// //                   type="text"
// //                   name="pincode"
// //                   placeholder="Enter your PIN/ZIP code"
// //                   className="h-12 text-base sm:flex-1 shadow-sm"
// //                   aria-label="PIN/ZIP Code"
// //                 />
// //                 <Button type="submit" size="lg" className="w-full sm:w-auto text-base h-12 px-6 shadow-md hover:shadow-lg transition-shadow">
// //                   <Search className="mr-2 h-5 w-5" /> Find Services
// //                 </Button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Why Choose Us Section */}
// //       <section className="w-full py-16 md:py-24 bg-secondary/20">
// //         <div className="container mx-auto px-4 md:px-6">
// //             <div className="text-center mb-12 md:mb-16">
// //                 <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Why Choose HandyConnect?</h2>
// //                 <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
// //                     We're committed to providing a seamless and trustworthy experience.
// //                 </p>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
// //             {whyChooseUsFeatures.map((feature) => (
// //               <div key={feature.title} className="text-center">
// //                 <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
// //                   <feature.icon className="h-8 w-8 text-primary" />
// //                 </div>
// //                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
// //                 <p className="text-muted-foreground">{feature.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* How It Works Section */}
// //       <section className="w-full py-16 md:py-24 bg-background">
// //         <div className="container mx-auto px-4 md:px-6">
// //           <div className="text-center mb-12 md:mb-16">
// //             <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">How It Works</h2>
// //             <p className="mt-3 text-lg text-muted-foreground">Getting reliable home services is as easy as 1-2-3.</p>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 relative">
// //             {/* Dashed line for desktop */}
// //             <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
// //                 <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="8 8" /></svg>
// //             </div>
// //             {howItWorksSteps.map((step, index) => (
// //                 <div key={step.title} className="text-center relative">
// //                     <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background shadow-md">
// //                         {index + 1}
// //                     </div>
// //                     <h3 className="text-xl font-bold mb-2">{step.title}</h3>
// //                     <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
// //                 </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Popular Services Section */}
// //       <section className="w-full py-16 md:py-24 bg-secondary/20">
// //         <div className="container mx-auto px-4 md:px-6">
// //           <div className="text-center mb-12 md:mb-16">
// //             <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Explore Popular Services</h2>
// //              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Find skilled professionals for the most in-demand services.</p>
// //           </div>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {popularServices.map((service) => (
// //               <Link key={service.name} href={`/all-services?category=${service.query}`} passHref>
// //                 <div className="group bg-card p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center h-full">
// //                   <div className={`mb-4 inline-flex items-center justify-center p-4 rounded-full ${service.bgColor} group-hover:scale-110 transition-transform`}>
// //                     <service.icon className={`h-10 w-10 ${service.color}`} />
// //                   </div>
// //                   <h3 className="font-headline text-xl font-bold text-card-foreground">{service.name}</h3>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //            <div className="text-center mt-12">
// //             <Link href="/all-services">
// //               <Button size="lg" variant="outline">Browse All Categories <ArrowRight className="ml-2 h-4 w-4"/></Button>
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action Section */}
// //       <section className="w-full">
// //          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
// //             <div className="bg-gradient-to-r from-primary via-blue-600 to-sky-500 p-8 md:p-16 rounded-xl shadow-2xl text-center text-primary-foreground">
// //                 <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">
// //                     Ready to Simplify Your Home Services?
// //                 </h2>
// //                 <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto text-lg">
// //                     Join HandyConnect today as a customer or a service provider. Your next home solution or client is just a few clicks away.
// //                 </p>
// //                 <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
// //                     <Link href="/all-services">
// //                         <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto text-lg py-3 px-8 shadow-md hover:shadow-lg">
// //                             Find a Service Pro
// //                         </Button>
// //                     </Link>
// //                     <Link href="/login">
// //                         <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/90 hover:text-primary w-full sm:w-auto text-lg py-3 px-8 shadow-md">
// //                             Offer Your Services
// //                         </Button>
// //                     </Link>
// //                 </div>
// //             </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }










// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { ArrowRight, Search, Zap, ShieldCheck, UserCheck, Sparkles, Paintbrush, Wrench, Stethoscope } from "lucide-react";
// // import Link from "next/link";
// // import React from "react";

// // // Data for sections
// // const popularServices = [
// //   { name: "Cleaner", icon: Sparkles, query: "cleaner", color: "text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/50" },
// //   { name: "Appliance Repair", icon: Wrench, query: "appliance%20repair", color: "text-gray-500", bgColor: "bg-gray-100 dark:bg-gray-900/50" },
// //   { name: "Painting", icon: Paintbrush, query: "painting", color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
// //   { name: "Healthcare", icon: Stethoscope, query: "healthcare", color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/50" },
// // ];

// // const whyChooseUsFeatures = [
// //   {
// //     icon: UserCheck,
// //     title: "Verified Professionals",
// //     description: "Every provider is vetted for skill and reliability, ensuring you get top-quality service every time.",
// //   },
// //   {
// //     icon: ShieldCheck,
// //     title: "Secure & Transparent",
// //     description: "Enjoy secure payments, clear pricing, and direct communication. No hidden fees, no surprises.",
// //   },
// //   {
// //     icon: Zap,
// //     title: "Fast & Convenient",
// //     description: "Find and book services in minutes. Our platform is designed to save you time and effort.",
// //   },
// // ];

// // const howItWorksSteps = [
// //     {
// //       title: "Discover Services",
// //       description: "Enter your PIN/ZIP code and browse a wide range of services offered by skilled local professionals in your area.",
// //     },
// //     {
// //       title: "Book Instantly",
// //       description: "Select your preferred provider, choose a convenient time slot that fits your schedule, and confirm your booking in minutes.",
// //     },
// //     {
// //       title: "Get It Done",
// //       description: "A verified and trusted professional will arrive on time to complete the job to your satisfaction. Relax and enjoy quality service!",
// //     },
// //   ];

// // // New Background Animation Component
// // const BackgroundAnimation = () => {
// //     return (
// //         <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
// //             <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
// //         </div>
// //     )
// // }

// // // Main component
// // export default function HomePage() {
// //   return (
// //     <div className="flex flex-col bg-background text-foreground relative overflow-hidden">
// //       <BackgroundAnimation />

// //       {/* Hero Section */}
// //       <section className="w-full">
// //         <div className="container mx-auto px-4 md:px-6">
// //           <div className="py-20 md:py-32 text-center">
// //             <div>
// //               <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
// //                 Your Home, <span className="text-primary">Expertly Handled.</span>
// //               </h1>
// //               <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
// //                 HandyConnect makes it effortless to find trusted local professionals for all your home service needs. Quick, reliable, and just a click away.
// //               </p>
// //               <form action="/all-services" method="GET" className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-2">
// //                 <Input
// //                   type="text"
// //                   name="pincode"
// //                   placeholder="Enter your PIN/ZIP code"
// //                   className="h-12 text-base sm:flex-1 shadow-sm bg-background/80 backdrop-blur-sm"
// //                   aria-label="PIN/ZIP Code"
// //                 />
// //                 <Button type="submit" size="lg" className="w-full sm:w-auto text-base h-12 px-6 shadow-md hover:shadow-lg transition-shadow">
// //                   <Search className="mr-2 h-5 w-5" /> Find Services
// //                 </Button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //        {/* How It Works Section - Moved to 2nd position */}
// //       <section className="w-full py-16 md:py-24 bg-background">
// //         <div className="container mx-auto px-4 md:px-6">
// //           <div className="text-center mb-12 md:mb-16">
// //             <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">How It Works</h2>
// //             <p className="mt-3 text-lg text-muted-foreground">Getting reliable home services is as easy as 1-2-3.</p>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 relative">
// //             {/* Dashed line for desktop */}
// //             <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
// //                 <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="8 8" /></svg>
// //             </div>
// //             {howItWorksSteps.map((step, index) => (
// //                 <div key={step.title} className="text-center relative">
// //                     <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background shadow-md">
// //                         {index + 1}
// //                     </div>
// //                     <h3 className="text-xl font-bold mb-2">{step.title}</h3>
// //                     <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
// //                 </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Popular Services Section - Moved to 3rd position */}
// //       <section className="w-full py-16 md:py-24 bg-secondary/20">
// //         <div className="container mx-auto px-4 md:px-6">
// //           <div className="text-center mb-12 md:mb-16">
// //             <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Explore Popular Services</h2>
// //              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Find skilled professionals for the most in-demand services.</p>
// //           </div>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {popularServices.map((service) => (
// //               <Link key={service.name} href={`/all-services?category=${service.query}`} passHref>
// //                 <div className="group bg-card p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center h-full">
// //                   <div className={`mb-4 inline-flex items-center justify-center p-4 rounded-full ${service.bgColor} group-hover:scale-110 transition-transform`}>
// //                     <service.icon className={`h-10 w-10 ${service.color}`} />
// //                   </div>
// //                   <h3 className="font-headline text-xl font-bold text-card-foreground">{service.name}</h3>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //            <div className="text-center mt-12">
// //             <Link href="/all-services">
// //               <Button size="lg" variant="outline">Browse All Categories <ArrowRight className="ml-2 h-4 w-4"/></Button>
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Why Choose Us Section - Moved to 4th position */}
// //       <section className="w-full py-16 md:py-24 bg-background">
// //         <div className="container mx-auto px-4 md:px-6">
// //             <div className="text-center mb-12 md:mb-16">
// //                 <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Why Choose HandyConnect?</h2>
// //                 <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
// //                     We're committed to providing a seamless and trustworthy experience.
// //                 </p>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
// //             {whyChooseUsFeatures.map((feature) => (
// //               <div key={feature.title} className="text-center">
// //                 <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
// //                   <feature.icon className="h-8 w-8 text-primary" />
// //                 </div>
// //                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
// //                 <p className="text-muted-foreground">{feature.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action Section */}
// //       <section className="w-full">
// //          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
// //             <div className="bg-gradient-to-r from-primary via-blue-600 to-sky-500 p-8 md:p-16 rounded-xl shadow-2xl text-center text-primary-foreground">
// //                 <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">
// //                     Ready to Simplify Your Home Services?
// //                 </h2>
// //                 <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto text-lg">
// //                     Join HandyConnect today as a customer or a service provider. Your next home solution or client is just a few clicks away.
// //                 </p>
// //                 <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
// //                     <Link href="/all-services">
// //                         <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto text-lg py-3 px-8 shadow-md hover:shadow-lg">
// //                             Find a Service Pro
// //                         </Button>
// //                     </Link>
// //                     <Link href="/login">
// //                         <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/90 hover:text-primary w-full sm:w-auto text-lg py-3 px-8 shadow-md">
// //                             Offer Your Services
// //                         </Button>
// //                     </Link>
// //                 </div>
// //             </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }














// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowRight, Search, Zap, ShieldCheck, UserCheck, Sparkles, Paintbrush, Wrench, Stethoscope } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import { cn } from "@/lib/utils";

// // Data for sections
// const popularServices = [
//   { name: "Cleaner", icon: Sparkles, query: "cleaner", color: "text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/50" },
//   { name: "Appliance Repair", icon: Wrench, query: "appliance%20repair", color: "text-gray-500", bgColor: "bg-gray-100 dark:bg-gray-900/50" },
//   { name: "Painting", icon: Paintbrush, query: "painting", color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
//   { name: "Healthcare", icon: Stethoscope, query: "healthcare", color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/50" },
// ];

// const whyChooseUsFeatures = [
//   {
//     icon: UserCheck,
//     title: "Verified Professionals",
//     description: "Every provider is vetted for skill and reliability, ensuring you get top-quality service every time.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Secure & Transparent",
//     description: "Enjoy secure payments, clear pricing, and direct communication. No hidden fees, no surprises.",
//   },
//   {
//     icon: Zap,
//     title: "Fast & Convenient",
//     description: "Find and book services in minutes. Our platform is designed to save you time and effort.",
//   },
// ];

// const howItWorksSteps = [
//     {
//       title: "Discover Services",
//       description: "Enter your PIN/ZIP code and browse a wide range of services offered by skilled local professionals in your area.",
//     },
//     {
//       title: "Book Instantly",
//       description: "Select your preferred provider, choose a convenient time slot that fits your schedule, and confirm your booking in minutes.",
//     },
//     {
//       title: "Get It Done",
//       description: "A verified and trusted professional will arrive on time to complete the job to your satisfaction. Relax and enjoy quality service!",
//     },
//   ];

// // New Background Animation Component
// const BackgroundAnimation = () => {
//     return (
//         <div className="absolute top-0 left-0 -z-10 h-full w-full">
//             <div
//                 className={cn(
//                     "absolute inset-0 transition-opacity duration-1000",
//                     "bg-[radial-gradient(circle_at_50%_200px,hsl(var(--primary)/0.1),transparent),radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.1),transparent),radial-gradient(circle_at_20%_40%,hsl(var(--primary)/0.05),transparent)]",
//                     "animate-aurora"
//                 )}
//                 style={{
//                     backgroundSize: "200% 200%",
//                 }}
//             />
//              {/* Grid pattern that adapts to theme */}
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 dark:opacity-5"></div>
//         </div>
//     )
// }

// // Main component
// export default function HomePage() {
//   return (
//     <div className="flex flex-col bg-background text-foreground relative overflow-hidden">
//       <BackgroundAnimation />

//       {/* Hero Section */}
//       <section className="w-full">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="py-20 md:py-32 text-center">
//             <div>
//               <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
//                 Your Home, <span className="text-primary">Expertly Handled.</span>
//               </h1>
//               <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
//                 HandyConnect makes it effortless to find trusted local professionals for all your home service needs. Quick, reliable, and just a click away.
//               </p>
//               <form action="/all-services" method="GET" className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-2">
//                 <Input
//                   type="text"
//                   name="pincode"
//                   placeholder="Enter your PIN/ZIP code"
//                   className="h-12 text-base sm:flex-1 shadow-sm bg-background/80 backdrop-blur-sm"
//                   aria-label="PIN/ZIP Code"
//                 />
//                 <Button type="submit" size="lg" className="w-full sm:w-auto text-base h-12 px-6 shadow-md hover:shadow-lg transition-shadow">
//                   <Search className="mr-2 h-5 w-5" /> Find Services
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//        {/* How It Works Section - Moved to 2nd position */}
//       <section className="w-full py-16 md:py-24 bg-background/80 backdrop-blur-sm">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">How It Works</h2>
//             <p className="mt-3 text-lg text-muted-foreground">Getting reliable home services is as easy as 1-2-3.</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 relative">
//             {/* Dashed line for desktop */}
//             <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
//                 <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="8 8" /></svg>
//             </div>
//             {howItWorksSteps.map((step, index) => (
//                 <div key={step.title} className="text-center relative">
//                     <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background shadow-md">
//                         {index + 1}
//                     </div>
//                     <h3 className="text-xl font-bold mb-2">{step.title}</h3>
//                     <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
//                 </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Services Section - Moved to 3rd position */}
//       <section className="w-full py-16 md:py-24 bg-secondary/20">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="text-center mb-12 md:mb-16">
//             <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Explore Popular Services</h2>
//              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Find skilled professionals for the most in-demand services.</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {popularServices.map((service) => (
//               <Link key={service.name} href={`/all-services?category=${service.query}`} passHref>
//                 <div className="group bg-card p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center h-full">
//                   <div className={`mb-4 inline-flex items-center justify-center p-4 rounded-full ${service.bgColor} group-hover:scale-110 transition-transform`}>
//                     <service.icon className={`h-10 w-10 ${service.color}`} />
//                   </div>
//                   <h3 className="font-headline text-xl font-bold text-card-foreground">{service.name}</h3>
//                 </div>
//               </Link>
//             ))}
//           </div>
//            <div className="text-center mt-12">
//             <Link href="/all-services">
//               <Button size="lg" variant="outline">Browse All Categories <ArrowRight className="ml-2 h-4 w-4"/></Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section - Moved to 4th position */}
//       <section className="w-full py-16 md:py-24 bg-background/80 backdrop-blur-sm">
//         <div className="container mx-auto px-4 md:px-6">
//             <div className="text-center mb-12 md:mb-16">
//                 <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Why Choose HandyConnect?</h2>
//                 <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
//                     We're committed to providing a seamless and trustworthy experience.
//                 </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
//             {whyChooseUsFeatures.map((feature) => (
//               <div key={feature.title} className="text-center">
//                 <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
//                   <feature.icon className="h-8 w-8 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="w-full">
//          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
//             <div className="bg-gradient-to-r from-primary via-blue-600 to-sky-500 p-8 md:p-16 rounded-xl shadow-2xl text-center text-primary-foreground">
//                 <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">
//                     Ready to Simplify Your Home Services?
//                 </h2>
//                 <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto text-lg">
//                     Join HandyConnect today as a customer or a service provider. Your next home solution or client is just a few clicks away.
//                 </p>
//                 <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
//                     <Link href="/all-services">
//                         <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto text-lg py-3 px-8 shadow-md hover:shadow-lg">
//                             Find a Service Pro
//                         </Button>
//                     </Link>
//                     <Link href="/login">
//                         <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/90 hover:text-primary w-full sm:w-auto text-lg py-3 px-8 shadow-md">
//                             Offer Your Services
//                         </Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//       </section>
//     </div>
//   );
// }










"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Zap, ShieldCheck, UserCheck, Sparkles, Paintbrush, Wrench, Stethoscope } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

// Data for sections
const popularServices = [
  { name: "Cleaner", icon: Sparkles, query: "cleaner", color: "text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/50" },
  { name: "Appliance Repair", icon: Wrench, query: "appliance%20repair", color: "text-gray-500", bgColor: "bg-gray-100 dark:bg-gray-900/50" },
  { name: "Painting", icon: Paintbrush, query: "painting", color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50" },
  { name: "Healthcare", icon: Stethoscope, query: "healthcare", color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/50" },
];

const whyChooseUsFeatures = [
  {
    icon: UserCheck,
    title: "Verified Professionals",
    description: "Every provider is vetted for skill and reliability, ensuring you get top-quality service every time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Enjoy secure payments, clear pricing, and direct communication. No hidden fees, no surprises.",
  },
  {
    icon: Zap,
    title: "Fast & Convenient",
    description: "Find and book services in minutes. Our platform is designed to save you time and effort.",
  },
];

const howItWorksSteps = [
    {
      title: "Discover Services",
      description: "Enter your PIN/ZIP code and browse a wide range of services offered by skilled local professionals in your area.",
    },
    {
      title: "Book Instantly",
      description: "Select your preferred provider, choose a convenient time slot that fits your schedule, and confirm your booking in minutes.",
    },
    {
      title: "Get It Done",
      description: "A verified and trusted professional will arrive on time to complete the job to your satisfaction. Relax and enjoy quality service!",
    },
  ];

// New Background Animation Component
const BackgroundAnimation = () => {
    return (
        <div className="absolute top-0 left-0 -z-10 h-full w-full">
            <div
                className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    "bg-[radial-gradient(circle_at_50%_200px,hsl(var(--primary)/0.1),transparent),radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.1),transparent),radial-gradient(circle_at_20%_40%,hsl(var(--primary)/0.05),transparent)]",
                    "animate-aurora"
                )}
                style={{
                    backgroundSize: "200% 200%",
                }}
            />
             {/* Grid pattern that adapts to theme */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 dark:opacity-5"></div>
        </div>
    )
}

// Main component
export default function HomePage() {
  return (
    <div className="flex flex-col bg-background text-foreground relative overflow-hidden">
      <BackgroundAnimation />

      {/* Hero Section */}
      <section className="w-full">
        <div className="container mx-auto px-4 md:px-6">
          <div className="py-20 md:py-32 flex items-center justify-center">
            <Card className="max-w-4xl bg-gradient-to-r from-primary via-blue-600 to-sky-500 text-primary-foreground border-0 shadow-2xl rounded-2xl p-8 md:p-12 text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
                Your Home, <span className="text-white">Expertly Handled.</span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/90 max-w-3xl mx-auto">
                HandyConnect makes it effortless to find trusted local professionals for all your home service needs. Quick, reliable, and just a click away.
              </p>
              <form action="/all-services" method="GET" className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-2">
                <Input
                  type="text"
                  name="pincode"
                  placeholder="Enter your PIN/ZIP code"
                  className="h-12 text-base sm:flex-1 shadow-sm bg-white/20 border-white/30 placeholder:text-white/70 text-white ring-offset-primary focus-visible:ring-white"
                  aria-label="PIN/ZIP Code"
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto text-base h-12 px-6 shadow-md hover:shadow-lg transition-shadow bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Search className="mr-2 h-5 w-5" /> Find Services
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

       {/* How It Works Section - Moved to 2nd position */}
      <section className="w-full py-16 md:py-24 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-3 text-lg text-muted-foreground">Getting reliable home services is as easy as 1-2-3.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 relative">
            {/* Dashed line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
                <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="8 8" /></svg>
            </div>
            {howItWorksSteps.map((step, index) => (
                <div key={step.title} className="text-center relative">
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background shadow-md">
                        {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section - Moved to 3rd position */}
      <section className="w-full py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Explore Popular Services</h2>
             <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Find skilled professionals for the most in-demand services.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <Link key={service.name} href={`/all-services?category=${service.query}`} passHref>
                <div className="group bg-card p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center h-full">
                  <div className={`mb-4 inline-flex items-center justify-center p-4 rounded-full ${service.bgColor} group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-10 w-10 ${service.color}`} />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-card-foreground">{service.name}</h3>
                </div>
              </Link>
            ))}
          </div>
           <div className="text-center mt-12">
            <Link href="/all-services">
              <Button size="lg" variant="outline">Browse All Categories <ArrowRight className="ml-2 h-4 w-4"/></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Moved to 4th position */}
      <section className="w-full py-16 md:py-24 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Why Choose HandyConnect?</h2>
                <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                    We're committed to providing a seamless and trustworthy experience.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {whyChooseUsFeatures.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full">
         <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="bg-gradient-to-r from-primary via-blue-600 to-sky-500 p-8 md:p-16 rounded-xl shadow-2xl text-center text-primary-foreground">
                <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">
                    Ready to Simplify Your Home Services?
                </h2>
                <p className="mt-4 text-primary-foreground/90 max-w-2xl mx-auto text-lg">
                    Join HandyConnect today as a customer or a service provider. Your next home solution or client is just a few clicks away.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/all-services">
                        <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-full sm:w-auto text-lg py-3 px-8 shadow-md hover:shadow-lg">
                            Find a Service Pro
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/90 hover:text-primary w-full sm:w-auto text-lg py-3 px-8 shadow-md">
                            Offer Your Services
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
