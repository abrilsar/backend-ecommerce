import type { FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import fastifyJwt, { FastifyJWT, FastifyJWTOptions } from '@fastify/jwt'
import { UserPayload } from '@/types/types';

export async function jwtPlugin<FastifyJWTOptions>(server: FastifyInstance) {
    await server.register(fastifyJwt,{
        secret:  process.env.JWT_SECRET!,
        decode: { complete: true },
        sign: { algorithm: 'HS256', expiresIn: '1h' },
        decoratorName: 'jwt',
    })

    server.decorate(
        'authenticate',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const data = await request.jwtVerify<FastifyJWT['payload']>();
                request.user = data
            } catch (error: any) {
                console.log("error: ", error)
                const message = error.message === "No Authorization was found in request.headers"? '401-default': error.message === 'Authorization token is invalid: The token is malformed / Authorization token expired'? '400-default':'500-default'
                throw Error(message)
            }
        }
    );
}