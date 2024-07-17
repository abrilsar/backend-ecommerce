import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/components/users/user.service';
import { ParamsType } from '@/types/types';


async function findOne(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return userService.findOne({_id: request.params.id});
}

async function findOrders(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return userService.findOrders({_id: request.params.id});
}

async function findAll(request: FastifyRequest, reply: FastifyReply) {
  return userService.findAll({});
}

export const userController = Object.freeze({
  findOne,
  findAll,
  findOrders
});
