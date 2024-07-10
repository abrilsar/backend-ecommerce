import { authController } from '@/components/auth/auth.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function authRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/sign-in', authController.signIn);
  fastify.post('/register', authController.register);
  fastify.get('/prueba', () => {return "holis"});
}
