import { authController } from '@/components/auth/auth.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { signInInput } from './auth.dto';
import { userDefinition } from '@avila-tek/models';
import { signInSchema, userJsonSchema } from '@/utils/constants/constants';


/**
 * @apiprefix /api/v1/auth
 * @description rutas que tiene que con el inicio de sesión del usuario
 * @apiVersion 1.0.0
 **/


export async function authRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {


  /** DOC
 * @api {post} /auth/sign-in Inicio de sesión
 * @apiDescription Endpoint para que los usuarios (clientes o administradores) inicien sesión.
 *
 * @apiAuth admin, client
 *
 * @apiParam {String} email Correo electrónico del usuario.
 * @apiParam {String} password Contraseña del usuario.
 * Body: 
 {
  "email": "andrea@example.com",
  "password": "123",
 }
 * @apiSuccess {String} accessToken Token de acceso.
 * @apiSuccess {String} refreshToken Token de refresco.
 * @apiSuccess {Object} el usuario
  * @apiExample {curl} Ejemplo de uso:
  *     curl -X POST http://api.example.com/api/v1/auth/sig-in
  */

  fastify.post('/sign-in', authController.signIn);


  /** DOC
 * @api {post} /auth/register Registro de usuario
 * @apiDescription Endpoint para registrar un nuevo usuario como cliente o administrador.
 *
 * @apiAuth admin, client
 *
 * @apiParam {String} name Nombre del usuario.
 * @apiParam {String} email Correo electrónico del usuario.
 * @apiParam {String} password Contraseña del usuario.
 * @apiParam {String[]} roles Roles del usuario. Puede ser 'admin' o 'client'.
 * @apiParam {String[]} [orders] Órdenes del usuario (inicialmente se manda vacio)
 * Body: 
  {
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "secretpassword",
  "roles": ["admin"],
  "orders": []
  }
 * @apiParam {String} email Correo electrónico del usuario.
 * @apiParam {String} password Contraseña del usuario.
 * @apiSuccess {Object} el usuario
 * @apiExample {curl} Ejemplo de uso:
 *     curl -X POST http://api.example.com/api/v1/auth/register
 */

  fastify.post('/register',
    {
      schema: { body: userJsonSchema },
      errorHandler: (error, _, __) => {
        if (error.message.includes('body')) {
          throw Error('400-default')
        }
        return error
      }
    },
    authController.register);
}
