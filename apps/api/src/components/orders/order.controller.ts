import type { FastifyRequest, FastifyReply } from 'fastify';
import { orderService } from '@/components/orders/order.service';
import { orderDefinition } from '@avila-tek/models';
import { PaginationOptions } from '@/types/types';
import { getQuery } from '@/plugins/pagination';

interface ParamsType {
  id: string;
}

async function findOne(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return orderService.findOne({ _id: request.params.id });
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
  
  return orderService.findAll(options);
}

async function deleteOne(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return orderService.deleteOne({ _id: request.params.id });
}

async function updateOne(request: FastifyRequest<{ Params: ParamsType, Body: typeof orderDefinition }>, reply: FastifyReply) {
  return orderService.updateOne({ _id: request.params.id }, request.body);
}

async function createOne(request: FastifyRequest<{ Body: typeof orderDefinition }>, reply: FastifyReply) {
  return orderService.createOne(request.body);
}

export const orderController = Object.freeze({
  findOne,
  findAll,
  deleteOne,
  updateOne,
  createOne,
});
