import 'fastify';
import { JWT } from '@fastify/jwt'

declare module 'fastify' {

    /**
     * Type function to extend FastifyInstance to work with hook authentication
     * onRequest: [fastify.authenticate] defined at src\plugins\jwtVerification.ts
     */
    type Authenticate = (
        request: FastifyRequest,
        reply: FastifyReply
    ) => Promise<void>;

    /**
     * Type function to extend FastifyInstance to work with hook authentorization
     * preHandler: fastify.auth([fastify.authorize]) defined at src\plugins\roleBasedAutorization.ts
     */
    type Authorize = (
        request: FastifyRequest,
        reply: FastifyReply
    ) => Promise<void>;

    /** Apply the extension */
    interface FastifyInstance {
        authenticate: Authenticate;
        authorize: Authorize;
    }

    /**
     * Interface to extend FastifyContextConfig, so the allowedRoles property can be added to
     * the options.config object in routes using authorization
     */
    interface FastifyContextConfig {
        allowedRoles?: string[];
    }

    interface FastifyRequest {
        jwt: JWT
      }

}

export interface UserPayload {
    _id: string;
    name: string;
    email: string;
    password: string;
    roles: [string];
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
      payload: UserPayload
    }
  }