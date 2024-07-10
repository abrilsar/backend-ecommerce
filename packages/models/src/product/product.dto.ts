import { z } from 'zod';
import { Schema, type Types, type Document } from 'mongoose';


export const productDefinition = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
  price: z.number(),
  category: z.string().min(3),
  stock: z.number(),
  createdAt: z.string().datetime().or(z.date()).nullable().optional(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});
