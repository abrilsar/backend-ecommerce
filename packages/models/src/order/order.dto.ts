import { z } from 'zod';
import { Schema, Types, type Document } from 'mongoose';

export const purchaseDefinition = z.object({
  product: z.instanceof(Types.ObjectId),
  amount: z.number(),
})

export const orderDefinition = z.object({
  user: z.instanceof(Types.ObjectId),
  purchase: z.array(purchaseDefinition),
  total: z.number(),
  state: z.enum(['pending', 'sent', 'delivered', 'canceled']),
  date: z.string().datetime().or(z.date()).nullable(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});
