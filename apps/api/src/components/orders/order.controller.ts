import type { FastifyRequest, FastifyReply } from 'fastify';
import { orderService } from '@/components/orders/order.service';

async function findOne(request: FastifyRequest, reply: FastifyReply) {
  return orderService.findOne({});
}

async function findAll(request: FastifyRequest, reply: FastifyReply) {
  return orderService.findAll({});
}

export const orderController = Object.freeze({
  findOne,
  findAll,
});
