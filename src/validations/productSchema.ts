import {z} from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(5,"nama product minimal 3 karakter"), 
    price: z.coerce.number().positive("Harga harus positive"),
    category: z.string().optional()
})