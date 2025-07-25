
'use client';

import { getSafeUser } from '@/lib/actions/user.actions';
import { getWalletTransactions } from '@/lib/actions/transaction.actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, PlusCircle, ReceiptText } from 'lucide-react';
import { currencySymbols } from '@/lib/constants';
import { TransactionCard } from '@/components/custom/transaction-card';
import type { Transaction, UserProfile } from '@/types';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState, useCallback } from 'react';
import { TopUpDialog } from '@/components/custom/top-up-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export default function WalletPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    
    const fetchData = useCallback(async () => {
        try {
            const [userData, transactionsData] = await Promise.all([
                getSafeUser(),
                getWalletTransactions()
            ]);
            setUser(userData);
            setTransactions(transactionsData as Transaction[]);
        } catch (error) {
            console.error("Failed to fetch wallet data", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    if (isLoading) {
        return (
            <div className="container mx-auto py-8 space-y-8">
                <Skeleton className="h-12 w-1/2" />
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Please Log In</CardTitle>
                        <CardDescription>You need to be logged in to view your wallet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currencySymbol = currencySymbols[user.currency] || '$';

    return (
        <>
        <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <div className="container mx-auto py-8 space-y-8">
            <div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold mb-2">My Wallet</h1>
                <p className="text-muted-foreground">View your balance, add funds, and track your transaction history.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                            <Wallet className="h-6 w-6 text-primary" />
                            <span>Current Balance</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{currencySymbol}{user.walletBalance.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">This balance is used for platform fees.</p>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                            <PlusCircle className="h-6 w-6 text-accent" />
                            <span>Add Funds</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground">
                            Top up your wallet to pay for platform fees.
                       </p>
                    </CardContent>
                    <CardFooter>
                        <TopUpDialog onSuccess={() => router.refresh()} currency={user.currency} />
                    </CardFooter>
                </Card>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                        <ReceiptText className="h-6 w-6 text-primary" />
                        <span>Transaction History</span>
                    </CardTitle>
                    <CardDescription>A record of all your wallet activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    {transactions.length > 0 ? (
                        <div className="space-y-4">
                            {transactions.map((tx: Transaction) => (
                                <TransactionCard key={tx.id} transaction={tx} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>You have no transactions yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
        </>
    );
}
