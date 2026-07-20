import {z} from 'zod'


export const transferSchema = z.object({
    senderId: z.coerce.number(),
    receiverId: z.coerce.number(),
    amount: z.coerce.number().positive("Amount harus positif")
})