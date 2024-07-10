import { model } from 'mongoose';
import { hash } from 'argon2';
import { orderSchema } from '@avila-tek/models';


export const Order = model('Order', orderSchema);
