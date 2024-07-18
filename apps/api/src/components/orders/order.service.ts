import { Order } from '@/components/orders/order.model';
import { paginate } from '@/plugins/pagination';
import { User } from '../users/user.model';
import { Product } from '../products/product.model';


async function findOne(args: any) {
  return await Order.findById({ ...args }).populate('user', 'name email', User).populate('purchase.product', 'name description price category', Product);
}

async function findAll(args: any) {
  try {
    const result = await paginate(Order, args);
    return result
  } catch (error: any) {
    throw Error(error.message)
  }
}

async function deleteOne(args: any) {
  const order = await Order.findByIdAndDelete({ ...args })

  if (order) {
    const user = await User.findOneAndUpdate(
      { _id: order.user },
      { $pull: { orders: { id: order._id } } },
      { new: true }
    );

    await user?.save()
  }

  return order
}

async function updateOne(filter: any, update: any) {
  return Order.findOneAndUpdate(filter, update, { new: true });
}

async function createOne(args: any) {
  const newOrder = new Order({ ...args })
  await newOrder.save();

  const user = await User.findOneAndUpdate(
    { _id: args.user },
    { $push: { orders: newOrder._id } },
    { new: true }
  )
  console.log("UserR: ", user)
  await user?.save()


  return newOrder
}


export const orderService = Object.freeze({
  findOne,
  findAll,
  deleteOne,
  updateOne,
  createOne,
});
