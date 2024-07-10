import type { FastifyRequest, FastifyReply } from 'fastify';
import { productService } from '@/components/products/product.service';

async function findOne(request: FastifyRequest, reply: FastifyReply) {
  return productService.findOne({});
}

async function findAll(request: FastifyRequest, reply: FastifyReply) {
  return productService.findAll({});
}

export const productController = Object.freeze({
  findOne,
  findAll,
});
