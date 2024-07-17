import { User } from '@/components/users/user.model';
import { Order } from '../orders/order.model';
import { Product } from '../products/product.model';

async function findOne(args: any) {
  return User.findOne({ ...args })
}

async function findOrders(args: any) {
  const user = await User.findOne({ ...args }).populate({
    path: 'orders',
    select: 'total state date purchase',
    model: Order,
    populate: {
      path: 'purchase.product',
      select: 'name description price category',
      model: Product,
    },
  })

  return user?.orders
}


async function findAll(args: any) {
  return User.find({ ...args });
}

export const userService = Object.freeze({
  findOne,
  findAll,
  findOrders,
});
