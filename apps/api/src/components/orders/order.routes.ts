import { orderController } from '@/components/orders/order.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function orderRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  // prefix: /api/v1/orders
  fastify.get('/:id',{config: { allowedRoles: ['admin'] }}, orderController.findOne);
  fastify.get('/', {config: { allowedRoles: ['admin'] }}, orderController.findAll);
  fastify.post('/', {config: { allowedRoles: ['admin'] }}, orderController.createOne);
  fastify.delete('/:id', {config: { allowedRoles: ['admin'] }}, orderController.deleteOne);
  fastify.patch('/:id', {config: { allowedRoles: ['admin'] }}, orderController.updateOne);
}
