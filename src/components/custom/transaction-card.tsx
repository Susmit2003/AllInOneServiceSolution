
import type { Transaction } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, RefreshCw, PlusCircle } from 'lucide-react';
import { currencySymbols } from '@/lib/constants';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
    transaction: Transaction;
}

const transactionTypeDetails = {
    top_up: { icon: PlusCircle, color: 'text-green-500' },
    booking_fee: { icon: ArrowUpRight, color: 'text-red-500' },
    cancellation_fee: { icon: ArrowUpRight, color: 'text-red-500' },
    refund: { icon: RefreshCw, color: 'text-blue-500' },
};

export function TransactionCard({ transaction }: TransactionCardProps) {
    const details = transactionTypeDetails[transaction.type];
    const Icon = details.icon;
    const currencySymbol = currencySymbols[transaction.currency] || '$';
    const isCredit = transaction.amount > 0;

    return (
        <Card className="bg-secondary/30">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 overflow-hidden">
                    <div className={`p-2 rounded-full bg-background ${details.color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-semibold truncate">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                            {format(new Date(transaction.createdAt), 'MMM d, yyyy, h:mm a')}
                        </p>
                    </div>
                </div>
                <div className={cn("font-bold text-lg whitespace-nowrap", isCredit ? "text-green-600 dark:text-green-400" : "text-foreground")}>
                    {isCredit ? '+' : ''}{currencySymbol}{transaction.amount.toFixed(2)}
                </div>
            </CardContent>
        </Card>
    );
}
