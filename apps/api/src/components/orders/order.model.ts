import { model } from 'mongoose';
import type { z } from 'zod';
import { orderSchema } from '@avila-tek/models';


export const Order = model('Order', orderSchema);
