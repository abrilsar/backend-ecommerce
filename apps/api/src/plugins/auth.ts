import type { FastifyInstance , FastifyRequest, FastifyReply} from 'fastify';
import auth from '@fastify/auth';

export async function authPlugin(server: FastifyInstance) {
    await server.register(auth);
    server.decorate(
        'authorize',
        async (request: FastifyRequest, reply: FastifyReply) => {
    
          try {
            const allowedRoles = request.routeOptions.config.allowedRoles;
            if (allowedRoles && request.user?.roles) {
                if (!allowedRoles.some(role => request.user.roles.includes(role))) {                    
                    throw Error('holasdd');
                }
            }
            
          } catch (error: any) {
            console.log("error: ", error)
            const message = error.message === "No Authorization was found in request.headers"? '401-default': error.message === 'Authorization token is invalid: The token is malformed / Authorization token expired'? '400-default':'500-default'
            throw Error(message)
          }
        }
    );
}
