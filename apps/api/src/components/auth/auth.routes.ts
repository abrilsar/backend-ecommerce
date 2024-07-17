import { authController } from '@/components/auth/auth.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { signInInput } from './auth.dto';
import { userDefinition } from '@avila-tek/models';

export async function authRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.post('/sign-in', authController.signIn);
  fastify.post('/register', authController.register);
}
