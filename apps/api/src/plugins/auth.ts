import type { FastifyInstance , FastifyRequest, FastifyReply} from 'fastify';
import auth from '@fastify/auth';
import { errorMessages } from '@/utils/constants/constants';


type ErrorMessageKey = keyof typeof errorMessages;

export async function authPlugin(server: FastifyInstance) {
    await server.register(auth);
    server.decorate(
        'authorize',
        async (request: FastifyRequest, reply: FastifyReply) => {
          try {
            const allowedRoles = request.routeOptions.config.allowedRoles;
            if (allowedRoles && request.user?.roles) {
                if (!allowedRoles.some(role => request.user.roles.includes(role))) {                    
                    throw Error('401-default');
                }
            }
          } catch (error: any) {        
            const message = error.message==="401-default"? '401-default' : errorMessages[error.message] || "500-default";
            throw Error(message);
          }
        }
    );
}
