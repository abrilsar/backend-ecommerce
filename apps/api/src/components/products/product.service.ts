import { Product } from '@/components/products/product.model';
import { paginate } from '@/plugins/pagination';
import { findPaginated } from 'mongo-cursor-pagination-alt'

async function findOne(args: any) {
  return Product.findOne({ ...args });
}

async function findAll(args: any) {
    try {
      const result = await paginate(Product, args);
      return result
    } catch (error: any) {
      throw Error(error.message)
    }
  }
  

async function deleteOne(args: any) {
  return Product.findByIdAndDelete({...args})
}

async function updateOne(filter: any, update: any) {
  return Product.findOneAndUpdate(filter,update, { new: true });
}

async function createOne(args: any) {
  const newProduct = new Product({...args})
  await newProduct.save();
  return newProduct
}

export const productService = Object.freeze({
  findOne,
  findAll,
  deleteOne,
  updateOne,
  createOne,
});
