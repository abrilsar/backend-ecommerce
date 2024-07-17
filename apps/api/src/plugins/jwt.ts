import type { FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import fastifyJwt, { FastifyJWT, FastifyJWTOptions } from '@fastify/jwt'
import { UserPayload } from '@/types/types';
import { errorMessages } from '@/utils/constants/constants';

export async function jwtPlugin<FastifyJWTOptions>(server: FastifyInstance) {
    await server.register(fastifyJwt,{
        secret:  process.env.JWT_SECRET!,
        decode: { complete: true },
        sign: { algorithm: 'HS256', expiresIn: '8h' },
        decoratorName: 'jwt',
    })

    server.decorate(
        'authenticate',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = await request.jwtVerify<FastifyJWT['payload']>();
                request.user = data
            } catch (error: any) {               
                const message = errorMessages[error.message] || "500-default";
                throw Error(message)
            }
        }
    );
}