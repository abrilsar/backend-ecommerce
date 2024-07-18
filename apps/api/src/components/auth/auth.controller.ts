import type { FastifyReply, FastifyRequest } from 'fastify';
import { authService } from '@/components/auth/auth.service';
import { userDefinition } from '@avila-tek/models';
import { TSignInInput } from '@/components/auth/auth.dto';

async function signIn(
  request: FastifyRequest<{ Body: TSignInInput }>,
  reply: FastifyReply
) {
  return authService.signIn(request, reply);
}

async function register(
  request: FastifyRequest<{ Body: typeof userDefinition._type }>,
  reply: FastifyReply
) {
  // TODO: fix this type herea
  return authService.register(request, reply);
}

export const authController = Object.freeze({ signIn, register });
