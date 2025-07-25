
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ClipboardList, Wallet, User } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';

export function MobileFooter() {
    const { isLoggedIn } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Home, label: "Home", public: true },
        { href: "/all-services", icon: LayoutGrid, label: "Services", public: true },
        { href: "/bookings", icon: ClipboardList, label: "Bookings", public: false },
        { href: "/wallet", icon: Wallet, label: "Wallet", public: false },
        { href: "/profile", icon: User, label: "Profile", public: false },
    ];

    const visibleItems = navItems.filter(item => item.public || isLoggedIn);

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur-sm md:hidden">
            <nav className="flex justify-around items-center h-16">
                {visibleItems.map(item => {
                    const isActive = (item.href === '/') ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                        <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center text-center text-muted-foreground w-full h-full">
                           <div className={cn("flex flex-col items-center justify-center p-2 rounded-lg transition-colors", isActive && "text-primary")}>
                                <item.icon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>
        </footer>
    );
}
