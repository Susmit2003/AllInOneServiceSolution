
// // "use client";

// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { Home, User, SlidersHorizontal, LayoutGrid, ClipboardList, LayoutDashboard, Bug, Lightbulb, Wallet, CalendarCheck, Bell } from 'lucide-react';
// // import './globals.css';
// // import { ThemeProvider } from '@/components/theme-provider';
// // import { Toaster } from '@/components/ui/toaster';
// // import { AppFooter } from '@/components/layout/app-footer';
// // import { AppLogo } from '@/components/icons/app-logo';
// // import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
// // import { ThemeToggle } from '@/components/custom/theme-toggle';
// // import { AuthProvider, useAuth } from '@/context/auth-context';
// // import { UserNav } from '@/components/layout/user-nav';
// // import { MobileFooter } from '@/components/layout/mobile-footer';
// // import { NotificationsPopover } from '@/components/layout/notifications-popover';

// // const sidebarNavItems = [
// //   { href: "/", icon: Home, label: "Home", tooltip: "Go to Home" },
// //   { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", tooltip: "User Dashboard" },
// //   { href: "/notifications", icon: Bell, label: "Notifications", tooltip: "View Notifications" },
// //   { href: "/all-services", icon: LayoutGrid, label: "Browse Services", tooltip: "Browse Services" },
// //   { href: "/bookings", icon: ClipboardList, label: "My Bookings", tooltip: "View Your Bookings" },
// //   { href: "/dashboard/my-services", icon: SlidersHorizontal, label: "My Services", tooltip: "Manage Your Offered Services" },
// //   { href: "/dashboard/provider-schedule", icon: CalendarCheck, label: "Provider Schedule", tooltip: "Manage Your Bookings" },
// // ];

// // const headerNavLinks = [
// //   { href: "/about", label: "About Us" },
// //   { href: "/terms", label: "Terms" },
// //   { href: "/privacy", label: "Privacy" },
// // ];


// // function AppLayout({ children }: { children: React.ReactNode }) {
// //   const { isLoggedIn } = useAuth();
// //   const [isMounted, setIsMounted] = useState(false);
// //   const pathname = usePathname();

// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);
  
// //   return (
// //      <SidebarProvider>
// //             {isMounted && isLoggedIn && (
// //               <Sidebar className="border-r" collapsible="icon">
// //                 <SidebarHeader className="p-4">
// //                   <Link href="/" className="flex items-center gap-2 font-headline text-xl font-semibold">
// //                     <AppLogo className="h-8 w-8 text-primary" />
// //                     <span className="group-data-[collapsible=icon]:hidden">HandyConnect</span>
// //                   </Link>
// //                 </SidebarHeader>
// //                 <SidebarContent>
// //                   <SidebarMenu>
// //                     {sidebarNavItems.map((item) => {
// //                       const isActive =
// //                         (item.href === '/' || item.href === '/dashboard' || item.href === '/notifications')
// //                           ? pathname === item.href
// //                           : pathname.startsWith(item.href);
                      
// //                       return (
// //                         <SidebarMenuItem key={item.label}>
// //                           <Link href={item.href}>
// //                             <SidebarMenuButton tooltip={item.tooltip} className="w-full justify-start" isActive={isActive}>
// //                               <item.icon className="h-5 w-5" />
// //                               <span>{item.label}</span>
// //                             </SidebarMenuButton>
// //                           </Link>
// //                         </SidebarMenuItem>
// //                       );
// //                     })}
// //                   </SidebarMenu>
// //                 </SidebarContent>
// //                 <SidebarFooter className="p-4 border-t">
// //                   <SidebarMenu>
// //                     <SidebarMenuItem>
// //                       <Link href="/suggest-feature">
// //                         <SidebarMenuButton className="w-full justify-start" tooltip="Suggest a Feature" isActive={pathname === '/suggest-feature'}>
// //                           <Lightbulb className="h-5 w-5" />
// //                           <span>Suggest a Feature</span>
// //                         </SidebarMenuButton>
// //                       </Link>
// //                     </SidebarMenuItem>
// //                     <SidebarMenuItem>
// //                       <Link href="/report-bug">
// //                         <SidebarMenuButton className="w-full justify-start" tooltip="Report a Bug" isActive={pathname === '/report-bug'}>
// //                           <Bug className="h-5 w-5" />
// //                           <span>Report a Bug</span>
// //                         </SidebarMenuButton>
// //                       </Link>
// //                     </SidebarMenuItem>
// //                     <SidebarMenuItem>
// //                       <Link href="/wallet">
// //                           <SidebarMenuButton className="w-full justify-start" tooltip="My Wallet" isActive={pathname.startsWith('/wallet')}>
// //                               <Wallet className="h-5 w-5" />
// //                               <span>My Wallet</span>
// //                           </SidebarMenuButton>
// //                       </Link>
// //                     </SidebarMenuItem>
// //                     <SidebarMenuItem>
// //                       <Link href="/profile">
// //                           <SidebarMenuButton className="w-full justify-start" tooltip="Profile" isActive={pathname.startsWith('/profile')}>
// //                               <User className="h-5 w-5" />
// //                               <span>Profile</span>
// //                           </SidebarMenuButton>
// //                       </Link>
// //                     </SidebarMenuItem>
// //                   </SidebarMenu>
// //                 </SidebarFooter>
// //               </Sidebar>
// //             )}
// //             <SidebarInset className="flex flex-col flex-1">
// //               <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
// //                 <div className="flex items-center gap-2">
// //                   {isMounted && isLoggedIn && (
// //                     <>
// //                       {/* Mobile Trigger */}
// //                       <div className="md:hidden">
// //                           <SidebarTrigger />
// //                       </div>
// //                       {/* Desktop Trigger */}
// //                        <div className="hidden md:block">
// //                           <SidebarTrigger />
// //                       </div>
// //                     </>
// //                   )}
// //                    <Link href="/" className="flex items-center gap-2 font-headline text-xl font-semibold">
// //                     <AppLogo className="h-8 w-8 text-primary" />
// //                     <span className="hidden md:inline group-data-[collapsible=icon]:hidden">HandyConnect</span>
// //                   </Link>
// //                 </div>
                
// //                 <nav className="hidden md:flex items-center gap-x-4 lg:gap-x-6">
// //                   {headerNavLinks.map((link) => (
// //                     <Link 
// //                       key={link.label} 
// //                       href={link.href} 
// //                       className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
// //                     >
// //                       {link.label}
// //                     </Link>
// //                   ))}
// //                 </nav>

// //                 <div className="flex items-center gap-2">
// //                   <ThemeToggle />
// //                   {isMounted && isLoggedIn && <NotificationsPopover />}
// //                   <UserNav />
// //                 </div>
// //               </header>
// //               <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
// //                 {children}
// //               </main>
// //               <AppFooter />
// //               <MobileFooter />
// //             </SidebarInset>
// //           </SidebarProvider>
// //   );
// // }


// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en" suppressHydrationWarning>
// //       <head>
// //         <title>HandyConnect</title>
// //         <meta name="description" content="Freelance home services platform" />
// //         <link rel="preconnect" href="https://fonts.googleapis.com" />
// //         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
// //         <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
// //       </head>
// //       <body className="font-body antialiased min-h-screen flex flex-col overflow-x-hidden" suppressHydrationWarning>
// //         <ThemeProvider
// //           attribute="class"
// //           defaultTheme="system"
// //           enableSystem
// //           disableTransitionOnChange
// //         >
// //           <AuthProvider>
// //             <AppLayout>{children}</AppLayout>
// //           </AuthProvider>
// //           <Toaster />
// //         </ThemeProvider>
// //       </body>
// //     </html>
// //   );
// // }







// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Home, User, SlidersHorizontal, LayoutGrid, ClipboardList, LayoutDashboard, Bug, Lightbulb, Wallet, CalendarCheck, Bell } from 'lucide-react';
// import './globals.css';
// import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from '@/components/ui/toaster';
// import { AppFooter } from '@/components/layout/app-footer';
// import { AppLogo } from '@/components/icons/app-logo';
// import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
// import { ThemeToggle } from '@/components/custom/theme-toggle';
// import { AuthProvider, useAuth } from '@/context/auth-context';
// import { UserNav } from '@/components/layout/user-nav';
// import { MobileFooter } from '@/components/layout/mobile-footer';
// import { NotificationsPopover } from '@/components/layout/notifications-popover';

// const sidebarNavItems = [
//   { href: "/", icon: Home, label: "Home", tooltip: "Go to Home" },
//   { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", tooltip: "User Dashboard" },
//   { href: "/notifications", icon: Bell, label: "Notifications", tooltip: "View Notifications" },
//   { href: "/all-services", icon: LayoutGrid, label: "Browse Services", tooltip: "Browse Services" },
//   { href: "/bookings", icon: ClipboardList, label: "My Bookings", tooltip: "View Your Bookings" },
//   { href: "/dashboard/my-services", icon: SlidersHorizontal, label: "My Services", tooltip: "Manage Your Offered Services" },
//   { href: "/dashboard/provider-schedule", icon: CalendarCheck, label: "Provider Schedule", tooltip: "Manage Your Bookings" },
// ];

// const headerNavLinks = [
//   { href: "/about", label: "About Us" },
//   { href: "/terms", label: "Terms" },
//   { href: "/privacy", label: "Privacy" },
// ];


// function AppLayout({ children }: { children: React.ReactNode }) {
//   const { isLoggedIn } = useAuth();
//   const [isMounted, setIsMounted] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);
  
//   return (
//      <SidebarProvider>
//             {isMounted && isLoggedIn && (
//               <Sidebar className="border-r" collapsible="icon">
//                 <SidebarHeader className="p-4">
//                   <Link href="/" className="flex items-center gap-2 font-headline text-xl font-semibold">
//                     <AppLogo className="h-8 w-8 text-primary" />
//                     <span className="group-data-[collapsible=icon]:hidden">HandyConnect</span>
//                   </Link>
//                 </SidebarHeader>
//                 <SidebarContent>
//                   <SidebarMenu>
//                     {sidebarNavItems.map((item) => {
//                       const isActive =
//                         (item.href === '/' || item.href === '/dashboard' || item.href === '/notifications')
//                           ? pathname === item.href
//                           : pathname.startsWith(item.href);
                      
//                       return (
//                         <SidebarMenuItem key={item.label}>
//                           <Link href={item.href}>
//                             <SidebarMenuButton tooltip={item.tooltip} className="w-full justify-start" isActive={isActive}>
//                               <item.icon className="h-5 w-5" />
//                               <span>{item.label}</span>
//                             </SidebarMenuButton>
//                           </Link>
//                         </SidebarMenuItem>
//                       );
//                     })}
//                   </SidebarMenu>
//                 </SidebarContent>
//                 <SidebarFooter className="p-4 border-t">
//                   <SidebarMenu>
//                     <SidebarMenuItem>
//                       <Link href="/suggest-feature">
//                         <SidebarMenuButton className="w-full justify-start" tooltip="Suggest a Feature" isActive={pathname === '/suggest-feature'}>
//                           <Lightbulb className="h-5 w-5" />
//                           <span>Suggest a Feature</span>
//                         </SidebarMenuButton>
//                       </Link>
//                     </SidebarMenuItem>
//                     <SidebarMenuItem>
//                       <Link href="/report-bug">
//                         <SidebarMenuButton className="w-full justify-start" tooltip="Report a Bug" isActive={pathname === '/report-bug'}>
//                           <Bug className="h-5 w-5" />
//                           <span>Report a Bug</span>
//                         </SidebarMenuButton>
//                       </Link>
//                     </SidebarMenuItem>
//                     <SidebarMenuItem>
//                       <Link href="/wallet">
//                           <SidebarMenuButton className="w-full justify-start" tooltip="My Wallet" isActive={pathname.startsWith('/wallet')}>
//                               <Wallet className="h-5 w-5" />
//                               <span>My Wallet</span>
//                           </SidebarMenuButton>
//                       </Link>
//                     </SidebarMenuItem>
//                     <SidebarMenuItem>
//                       <Link href="/profile">
//                           <SidebarMenuButton className="w-full justify-start" tooltip="Profile" isActive={pathname.startsWith('/profile')}>
//                               <User className="h-5 w-5" />
//                               <span>Profile</span>
//                           </SidebarMenuButton>
//                       </Link>
//                     </SidebarMenuItem>
//                   </SidebarMenu>
//                 </SidebarFooter>
//               </Sidebar>
//             )}
//             <SidebarInset className="flex flex-col flex-1">
//               <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
//                 <div className="flex items-center gap-2">
//                   {isMounted && isLoggedIn && (
//                     <>
//                       {/* Mobile Trigger */}
//                       <div className="md:hidden">
//                           <SidebarTrigger />
//                       </div>
//                       {/* Desktop Trigger */}
//                        <div className="hidden md:block">
//                           <SidebarTrigger />
//                       </div>
//                     </>
//                   )}
//                    <Link href="/" className="flex items-center gap-2 font-headline text-xl font-semibold">
//                     <AppLogo className="h-8 w-8 text-primary" />
//                     <span className="hidden md:inline group-data-[collapsible=icon]:hidden">HandyConnect</span>
//                   </Link>
//                 </div>
                
//                 <nav className="hidden md:flex items-center gap-x-4 lg:gap-x-6">
//                   {headerNavLinks.map((link) => (
//                     <Link 
//                       key={link.label} 
//                       href={link.href} 
//                       className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
//                     >
//                       {link.label}
//                     </Link>
//                   ))}
//                 </nav>

//                 <div className="flex items-center gap-2">
//                   <ThemeToggle />
//                   {isMounted && isLoggedIn && <NotificationsPopover />}
//                   <UserNav />
//                 </div>
//               </header>
//               <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
//                 {children}
//               </main>
//               <AppFooter />
//               <MobileFooter />
//             </SidebarInset>
//           </SidebarProvider>
//   );
// }


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <title>HandyConnect</title>
//         <meta name="description" content="Freelance home services platform" />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
//       </head>
//       <body className="font-body antialiased min-h-screen flex flex-col overflow-x-hidden" suppressHydrationWarning>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <AuthProvider>
//             <AppLayout>{children}</AppLayout>
//           </AuthProvider>
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }




"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script'; // Import the Next.js Script component
import { usePathname } from 'next/navigation';
import { Home, User, SlidersHorizontal, LayoutGrid, ClipboardList, LayoutDashboard, Bug, Lightbulb, Wallet, CalendarCheck, Bell } from 'lucide-react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AppFooter } from '@/components/layout/app-footer';
import { AppLogo } from '@/components/icons/app-logo';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/custom/theme-toggle';
import { AuthProvider, useAuth } from '@/context/auth-context';
import { UserNav } from '@/components/layout/user-nav';
import { MobileFooter } from '@/components/layout/mobile-footer';
import { NotificationsPopover } from '@/components/layout/notifications-popover';

const sidebarNavItems = [
  { href: "/", icon: Home, label: "Home", tooltip: "Go to Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", tooltip: "User Dashboard" },
  { href: "/notifications", icon: Bell, label: "Notifications", tooltip: "View Notifications" },
  { href: "/all-services", icon: LayoutGrid, label: "Browse Services", tooltip: "Browse Services" },
  { href: "/bookings", icon: ClipboardList, label: "My Bookings", tooltip: "View Your Bookings" },
  { href: "/dashboard/my-services", icon: SlidersHorizontal, label: "My Services", tooltip: "Manage Your Offered Services" },
  { href: "/dashboard/provider-schedule", icon: CalendarCheck, label: "Provider Schedule", tooltip: "Manage Your Bookings" },
];

const headerNavLinks = [
  { href: "/about", label: "About Us" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];


function AppLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
     <SidebarProvider>
            {isMounted && isLoggedIn && (
              <Sidebar className="border-r" collapsible="icon">
                <SidebarHeader className="p-4">
                  <Link href="/" className="flex items-center gap-2 font-headline text-xl font-semibold">
                    <AppLogo className="h-8 w-8 text-primary" />
                    <span className="group-data-[collapsible=icon]:hidden">HandyConnect</span>
                  </Link>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarMenu>
                    {sidebarNavItems.map((item) => {
                      const isActive =
                        (item.href === '/' || item.href === '/dashboard' || item.href === '/notifications')
                          ? pathname === item.href
                          : pathname.startsWith(item.href);
                      
                      return (
                        <SidebarMenuItem key={item.label}>
                          <Link href={item.href}>
                            <SidebarMenuButton tooltip={item.tooltip} className="w-full justify-start" isActive={isActive}>
                              <item.icon className="h-5 w-5" />
                              <span>{item.label}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarContent>
                <SidebarFooter className="p-4 border-t">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Link href="/suggest-feature">
                        <SidebarMenuButton className="w-full justify-start" tooltip="Suggest a Feature" isActive={pathname === '/suggest-feature'}>
                          <Lightbulb className="h-5 w-5" />
                          <span>Suggest a Feature</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/report-bug">
                        <SidebarMenuButton className="w-full justify-start" tooltip="Report a Bug" isActive={pathname === '/report-bug'}>
                          <Bug className="h-5 w-5" />
                          <span>Report a Bug</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/wallet">
                          <SidebarMenuButton className="w-full justify-start" tooltip="My Wallet" isActive={pathname.startsWith('/wallet')}>
                              <Wallet className="h-5 w-5" />
                              <span>My Wallet</span>
                          </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <Link href="/profile">
                          <SidebarMenuButton className="w-full justify-start" tooltip="Profile" isActive={pathname.startsWith('/profile')}>
                              <User className="h-5 w-5" />
                              <span>Profile</span>
                          </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>
            )}
            <SidebarInset className="flex flex-col flex-1">
              <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
                <div className="flex items-center gap-2">
                  {isMounted && isLoggedIn && (
                    <>
                      {/* Mobile Trigger */}
                      <div className="md:hidden">
                          <SidebarTrigger />
                      </div>
                      {/* Desktop Trigger */}
                       <div className="hidden md:block">
                          <SidebarTrigger />
                      </div>
                    </>
                  )}
                   <Link href="/" className="flex items-center gap-2 font-headline text-xl font-semibold">
                    <AppLogo className="h-8 w-8 text-primary" />
                    <span className="hidden md:inline group-data-[collapsible=icon]:hidden">HandyConnect</span>
                  </Link>
                </div>
                
                <nav className="hidden md:flex items-center gap-x-4 lg:gap-x-6">
                  {headerNavLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  {isMounted && isLoggedIn && <NotificationsPopover />}
                  <UserNav />
                </div>
              </header>
              <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
                {children}
              </main>
              <AppFooter />
              <MobileFooter />
            </SidebarInset>
          </SidebarProvider>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>HandyConnect</title>
        <meta name="description" content="Freelance home services platform" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col overflow-x-hidden" suppressHydrationWarning>
        {/* **THIS IS THE FIX** - Load the Razorpay script on every page */}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

