import { productController } from '@/components/products/product.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function productRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
/**
  // prefix: /api/v1/products
 * @api {get} / Obtener una lista de productos
 * @apiauth admin or client
 * @apiParam {Number} [page=1] Número de página para paginación.
 * @apiSuccess {Object[]} data Lista de productos
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://api.example.com/users?page=2&limit=20
 * @apiVersion 1.0.0
 */

  fastify.get('/:id', {config: { allowedRoles: ['admin', 'client'] }}, productController.findOne);



  fastify.get('/',{config: { allowedRoles: ['admin', 'client'] }}, productController.findAll);
  fastify.post('/', {config: { allowedRoles: ['admin'] }},productController.createOne);
  fastify.delete('/:id', {config: { allowedRoles: ['admin'] }}, productController.deleteOne);
  fastify.patch('/:id', {config: { allowedRoles: ['admin'] }}, productController.updateOne);

  // fastify.get('/', {config: { allowedRoles: ['admin', 'client'] }},()=>{return 'the black dog'});
  // fastify.get('/', ()=>{return 'the black dog'});
}
