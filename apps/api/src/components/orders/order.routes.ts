import { orderController } from '@/components/orders/order.controller';
import { orderJsonSchema } from '@/utils/constants/constants';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';

export async function orderRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {

  fastify.addHook('onRoute', (route) => {
    route.config = { allowedRoles: ['admin'] };
  });

  // prefix: /api/v1/orders
  fastify.get('/:id', orderController.findOne);
  fastify.get('/',  orderController.findAll);

  fastify.post('/',  
    {schema: {body: orderJsonSchema},
    errorHandler: (error, _, __) => {
      throw Error('400-default')
    }
    },
    orderController.createOne
  );
  
    fastify.delete('/:id',  orderController.deleteOne);
    fastify.patch('/:id', orderController.updateOne);
}
