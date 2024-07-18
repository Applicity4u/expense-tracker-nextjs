'use server'

import { db } from "@/lib/db"
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from "next/cache"

async function deleteTransaction(transactionId: string): Promise<{
    message?: string
    error?: string
}> {

    const { userId } = auth()

    if (!userId) {
        return { error: 'USer not found'}
    }

    try {
        const transactions = await db.transaction.delete({
            where: {
                id: transactionId,
                userId
            }
        })
        revalidatePath('/')

        return { message: 'Transaction deleted' }
    } catch (error) {
        return {error: 'Database error: deleteTransaction()'}
    }

}

export default deleteTransaction