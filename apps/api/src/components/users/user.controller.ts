import type { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '@/components/users/user.service';
import { PaginationOptions, ParamsType } from '@/types/types';
import { getQuery } from '@/plugins/pagination';


async function findOne(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return userService.findOne({ _id: request.params.id });
}

async function findOrders(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return userService.findOrders({ _id: request.params.id });
}

async function findAll(request: FastifyRequest<{ Querystring: PaginationOptions }>, reply: FastifyReply) {
  const query = request.query.query? request.query.query.split('='): []
  const userQuery =  query.length > 1 ? getQuery(request.query.query): {}


  const options: PaginationOptions = {
    limit: request.query.limit ? Number(request.query.limit) : 10,
    cursor: request.query.cursor || undefined,
    direction: request.query.direction || 'next',
    query: userQuery,
  };
  return userService.findAll({});
}

export const userController = Object.freeze({
  findOne,
  findAll,
  findOrders
});
