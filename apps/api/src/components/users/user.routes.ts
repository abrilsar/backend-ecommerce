import { userController } from '@/components/users/user.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function userRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.get('/:id', { config: { allowedRoles: ['admin', 'client'] } }, userController.findOne);

  fastify.get('/:id/orders', { config: { allowedRoles: ['admin', 'client'] } }, userController.findOrders);

  fastify.get('/', { config: { allowedRoles: ['admin'] } }, userController.findAll);
}
