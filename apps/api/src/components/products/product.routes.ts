import { productController } from '@/components/products/product.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function productRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  // fastify.get('/v1/users/:id', productController.findOne);

  // fastify.get('/v1/users', productController.findAll);
}
