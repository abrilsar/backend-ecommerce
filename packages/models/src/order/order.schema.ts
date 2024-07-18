import type { z } from 'zod';
import { Schema, type Types, type Document } from 'mongoose';
import { orderDefinition, purchaseDefinition } from './order.dto';


export type IPurchase = z.infer<typeof purchaseDefinition>;

const purchaseSchema = new Schema<IPurchase, Document<Types.ObjectId, any, IPurchase>>({
  product: {
    type: Schema.Types.ObjectId,
    required: [true, ''],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, ''],
  },
});

export type IOrder = z.infer<typeof orderDefinition>;

export type OrderDocument = IOrder & Document<Types.ObjectId, any, IOrder>;

export const orderSchema = new Schema<IOrder, OrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, ''],
    },
    purchase: {
      type: [purchaseSchema],
      required: [true, ''],
    },
    total: {
      type: Number,
      required: [true, ''],
    },
    state: {
      type: String,
      required: [true, ''],
      enum: ['pending', 'sent', 'delivered', 'canceled'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, ''],
    },
  },
  { timestamps: true }
);
