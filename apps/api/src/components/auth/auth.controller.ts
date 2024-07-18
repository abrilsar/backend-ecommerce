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
  return authService.register(request, reply);
}

async function signOut( 
  request: FastifyRequest,
  reply: FastifyReply) {
  console.log('chissss')

  return authService.signOut(reply)
}

export const authController = Object.freeze({ signIn, register, signOut });
