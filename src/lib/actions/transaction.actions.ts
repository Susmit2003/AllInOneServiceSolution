
'use server';

import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/transaction.model';
import { getSafeUser } from './user.actions';
import { parseJSON } from './utils';

export async function getWalletTransactions() {
    try {
        const user = await getSafeUser();
        if (!user) {
            return [];
        }

        await dbConnect();
        const transactions = await Transaction.find({ userId: user.id }).sort({ createdAt: -1 }).limit(50); // Limit to last 50 transactions
        return parseJSON(transactions);
    } catch (error) {
        console.error(error);
        return [];
    }
}
