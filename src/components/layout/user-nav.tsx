
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, SlidersHorizontal, LogIn, LogOut, LayoutDashboard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { logoutUser } from '@/lib/actions/user.actions';
import { currencySymbols } from '@/lib/constants';


export const UserNav = () => {
  const { isLoggedIn, logout, isLoading, currentUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    logout(); // This clears context state and redirects
  }
  
  if (isLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  if (!isLoggedIn || !currentUser) {
    return (
      <Link href="/login">
        <Button variant="outline">
          <LogIn className="mr-2 h-4 w-4" /> Login
        </Button>
      </Link>
    );
  }

  const currencySymbol = currencySymbols[currentUser.currency] || '$';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.profileImage || `https://placehold.co/100x100.png?text=${currentUser.fullName?.charAt(0) || 'U'}`} alt={currentUser.fullName || "User Avatar"} data-ai-hint="user avatar" />
            <AvatarFallback>{currentUser.fullName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{currentUser.fullName || currentUser.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.mobileNumber}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
         <DropdownMenuItem asChild>
          <Link href="/wallet">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center text-muted-foreground">
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Wallet</span>
                </div>
                <span className="font-semibold">{currencySymbol}{currentUser.walletBalance.toFixed(2)}</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
          <Link href="/dashboard/my-services"><SlidersHorizontal className="mr-2 h-4 w-4" />My Services</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
