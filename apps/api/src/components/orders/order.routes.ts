import { orderController } from '@/components/orders/order.controller';
import { orderJsonSchema } from '@/utils/constants/constants';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';


/**
 * @apiprefix /api/v1/orders
 * @description rutas que tiene que ver con la gestion de los pedidos
 **/


export async function orderRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {

  //Hook para asignales las reglas a las rutas 
  fastify.addHook('onRoute', (route) => {
    if (route.method === 'POST') {
      route.config = { allowedRoles: ['admin', 'client'] };
      console.log()
    } else {
      route.config = { allowedRoles: ['admin'] };
    }
  });

  /** DOC
 * @api {get} / ver una compra
 * @apiDescription Endpoint para ver una compra en específico.
 *
 * @apiAuth admin
 * @apiSuccess {Object} la compra
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X GET https://backend-ecommerce-6-oj5e.onrender.com/api/v1/orders/6698723384d199bd63e20588
 */

  fastify.get('/:id', orderController.findOne);


  /** DOC
* @api {get} / ver pedidos
* @apiDescription Endpoint para ver un prodcucto en específico.
* 
* @apiAuth admin
* 
* @apiParam {String} cursor Cursor para la paginación
* @apiParam {Number} limit=10 Límite de resultados por página
* @apiParam {String} direction para saber si ir hacia la pagina de adelante o la de atras (next || prev)
* @apiParam {String} query para buscar por una característica en específico
* @apiSuccess {Object[]} Los pedidos por página 
* @apiExample {curl} Ejemplo de uso:
*     curl -X GET https://backend-ecommerce-6-oj5e.onrender.com/api/v1/orders?limit=2&cursor=6698728d84d199bd63e2058e&direction=next  (da la segunda pagina)
*     curl -X GET https://backend-ecommerce-6-oj5e.onrender.com/api/v1/orders?limit=2&query=state=pending 
*/

  fastify.get('/', orderController.findAll);


  /** DOC
* @api {post} / Registro de una pedido
* @apiDescription Endpoint para registrar una nueva pedido.
*
* @apiAuth admin
*
* @apiParam {String} user ID del usuario que realiza la orden.
* @apiParam {Object[]} purchase Productos comprados en la orden.
* @apiParam {Number} total Monto total de la orden.
* @apiParam {String} state Estado de la orden (pending, sent, delivered, canceled).
* @apiParam {Date} date Fecha del pedido.
*
* @apiParamExample {json} Body:
 * {
 *   "user": "669844a237921c647a2f67b3",
 *   "purchase": [
 *     {
 *       "product": "669842f537921c647a2f679e",
 *       "quantity": 2
 *     },
 *     {
 *       "product": "6698432d37921c647a2f67a0",
 *       "quantity": 1
 *     }
 *   ],
 *   "total": 54.99,
 *   "state": "pending",
 *   "date": "2023-05-15T12:00:00.000Z"
 * }
 *

* @apiSuccess {Object} el producto
* @apiExample {curl} Ejemplo de uso:
*     curl -X POST https://backend-ecommerce-6-oj5e.onrender.com/api/v1/products
*/


  fastify.post('/',
    {
      schema: { body: orderJsonSchema },
      errorHandler: (error, _, __) => {
        if (error.message.includes('body')) {
          throw Error('400-default')
        }
        return error
      }
    },
    orderController.createOne
  );


  /** DOC
* @api {delete} / Borrar un pedido
* @apiDescription Endpoint para borrar un pedido.
*
* @apiAuth admin
* 
* @apiSuccess {Object} el pedido
* @apiExample {curl} Ejemplo de uso:
*     curl -X DELETE https://backend-ecommerce-6-oj5e.onrender.com/api/v1/orders/6698733284d199bd63e205a0
*/

  fastify.delete('/:id', orderController.deleteOne);


  /** DOC
* @api {patch} / actualización de una compra
* @apiDescription Endpoint para actualizar el valor de una compra.
*
* @apiAuth admin
*
* @apiParam {Object} parametro que se quieren actualizar.
* Body: 
{
"state": "sent"
}
* @apiSuccess {Object} la compra
* @apiExample {curl} Ejemplo de uso:
*     curl -X PATCH https://backend-ecommerce-6-oj5e.onrender.com/api/v1/orders/669872f584d199bd63e2059a
*/


  fastify.patch('/:id', orderController.updateOne);
}
