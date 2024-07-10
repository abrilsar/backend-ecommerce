import { orderController } from '@/components/orders/order.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function orderRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  // fastify.get('/v1/users/:id', orderController.findOne);

  // fastify.get('/v1/users', orderController.findAll);
}
