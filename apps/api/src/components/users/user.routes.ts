import { userController } from '@/components/users/user.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function userRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {

  /** DOC
 * @api {get} / ver un usuario
 * @apiDescription Endpoint para ver un usuario en específico.
 *
 * @apiAuth admin o client
 * @apiSuccess {Object} el cliente
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X GET http://localhost:3000/api/v1/users/669844a237921c647a2f67b3
 */

  fastify.get('/:id', { config: { allowedRoles: ['admin', 'client'] } }, userController.findOne);

  /** DOC
 * @api {get} / ver los pedidos usuario
 * @apiDescription Endpoint para ver los pedidos que un usuario ha realizado.
 *
 * @apiAuth admin o client
 * @apiSuccess {Object[]} pedidos del cliente
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X GET http://localhost:3000/api/v1/users/669844a237921c647a2f67b3/orders
 */

  fastify.get('/:id/orders', { config: { allowedRoles: ['admin', 'client'] } }, userController.findOrders);

  /** DOC
  * @api {get} / ver usuarios
  * @apiDescription Endpoint para ver todos los usuarios registrados en la plataforma.
  *
  * @apiParam {String} cursor Cursor para la paginación
  * @apiParam {Number} limit=10 Límite de resultados por página
  * @apiParam {String} direction para saber si ir hacia la pagina de adelante o la de atras (next || prev) 
  * 
  * @apiAuth admin
  * @apiSuccess {Object[]} clientes
  * @apiExample {curl} Ejemplo de uso:
  *     curl -X GET http://localhost:3000/api/v1/users
  */


  fastify.get('/', { config: { allowedRoles: ['admin'] } }, userController.findAll);
}
