import { productController } from '@/components/products/product.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { productJsonSchema } from '@/utils/constants/constants';


/**
 * @apiprefix /api/v1/products
 * @description rutas que tiene que ver con la gestion de los productos
 **/


export async function productRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {

  //Hook para asignales las reglas a las rutas
  fastify.addHook('onRoute', (route) => {
    if (route.method === 'GET') {
      route.config = { allowedRoles: ['admin', 'client'] };
      console.log()
    } else {
      route.config = { allowedRoles: ['admin'] };
    }

  });

  /** DOC
 * @api {get} / ver un producto
 * @apiDescription Endpoint para ver un prodcucto en específico.
 *
 * @apiAuth admin o client
 * @apiSuccess {Object} el producto
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X GET http://localhost:3000/api/v1/products/669842f537921c647a2f679e
 */

  fastify.get('/:id', productController.findOne);


  /** DOC
* @api {get} / ver productos
* @apiDescription Endpoint para ver un prodcucto en específico.
* 
* @apiAuth admin o client
* 
* @apiParam {String} cursor Cursor para la paginación
* @apiParam {Number} limit=10 Límite de resultados por página
* @apiParam {String} direction para saber si ir hacia la pagina de adelante o la de atras (next || prev) 
* @apiSuccess {Object[]} Los productos por página 
* @apiExample {curl} Ejemplo de uso:
*     curl -X GET http://localhost:3000/api/v1/products?limit=3&cursor=6698433f37921c647a2f67a2&direction=next  (da la segunda pagina)
*/

  fastify.get('/', productController.findAll);


  /** DOC
* @api {post} / Registro del producto
* @apiDescription Endpoint para registrar un nuevo prodcucto como administrador.
*
* @apiAuth admin
*
* @apiParam {String} name Nombre del producto.
* @apiParam {String} description descripción del producto
* @apiParam {Number} price Precio del prodcuto
* @apiParam {String} category Categoria del producto
* @apiParam {Number} stock Cantidad disponible

* @apiSuccess {Object} el producto
* @apiExample {curl} Ejemplo de uso:
*     curl -X POST http://localhost:3000/api/v1/products/
*/

  fastify.post('/',
    {
      schema: { body: productJsonSchema },
      errorHandler: (error, _, __) => {
        if (error.message.includes('body')) {
          throw Error('400-default')
        }
        return error
      }
    },
    productController.createOne
  );

  /** DOC
* @api {patch} / Borrar un producto
* @apiDescription Endpoint para borrar un prodcucto.
*
* @apiAuth admin
* 
* @apiSuccess {Object} el producto
* @apiExample {curl} Ejemplo de uso:
*     curl -X DELETE http://localhost:3000/api/v1/products/669848903d75ecb6e50e1bc1
*/

  fastify.delete('/:id', productController.deleteOne);

  /** DOC
* @api {patch} / actualización de un producto
* @apiDescription Endpoint para actualizar el valor de un prodcucto.
*
* @apiAuth admin
*
* @apiParam {Object} parametro que se quieren actualizar.
* Body: 
{
"name": "Libro de cocina italiana"
"stock": 1234
}
* @apiSuccess {Object} el producto
* @apiExample {curl} Ejemplo de uso:
*     curl -X PATCH http://localhost:3000/api/v1/products/6698442137921c647a2f67b0
*/

  fastify.patch('/:id', productController.updateOne);

}
