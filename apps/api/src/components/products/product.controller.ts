import type { FastifyRequest, FastifyReply } from 'fastify';
import { productService } from '@/components/products/product.service';
import { productDefinition } from '@avila-tek/models';
import { PaginationOptions } from "@/types/types";
import { ParamsType } from '@/types/types';
import { getQuery } from '@/plugins/pagination';



async function findOne(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return productService.findOne({ _id: request.params.id });
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

  return productService.findAll(options);
}

async function deleteOne(request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) {
  return productService.deleteOne({ _id: request.params.id });
}

async function updateOne(request: FastifyRequest<{ Params: ParamsType, Body: typeof productDefinition }>, reply: FastifyReply) {
  return productService.updateOne({ _id: request.params.id }, request.body);
}

async function createOne(request: FastifyRequest<{ Body: typeof productDefinition }>, reply: FastifyReply) {
  return productService.createOne(request.body);
}

export const productController = Object.freeze({
  findOne,
  findAll,
  deleteOne,
  updateOne,
  createOne,
});
