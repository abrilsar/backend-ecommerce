import { productController } from '@/components/products/product.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { productJsonSchema } from '@/utils/constants/constants';

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

  fastify.addHook('onRoute', (route) => {
    if (route.method === 'GET') {
      route.config = { allowedRoles: ['admin', 'client'] };
      console.log()
    } else {
      route.config = { allowedRoles: ['admin'] };
    }

  });

  fastify.get('/:id', productController.findOne);

  fastify.get('/', productController.findAll);

  fastify.post('/', 
    {schema: {body: productJsonSchema},
      errorHandler: (error, _, __) => {
        throw Error('400-default')
      }
  },
    productController.createOne
  );
  
  fastify.delete('/:id', productController.deleteOne);
  
  fastify.patch('/:id',  productController.updateOne);

}
