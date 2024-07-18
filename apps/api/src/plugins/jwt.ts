import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt, { FastifyJWT, FastifyJWTOptions } from '@fastify/jwt'
import { UserPayload } from '@/types/types';
import { errorMessages } from '@/utils/constants/constants';
import { setCookie } from './cookie';
import jwt from 'jsonwebtoken';


const refreshTokenBlacklist = new Set();

export async function jwtPlugin<FastifyJWTOptions>(server: FastifyInstance) {
    await server.register(fastifyJwt, {
        secret: process.env.JWT_SECRET!,
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

                const refreshToken = request.headers['x-refresh-token'] as string

                if (error.message === errorMessages[2] && refreshToken) {
                    try {

                        const data = request.jwt.verify<FastifyJWT['payload']>(refreshToken)

                        if (refreshTokenBlacklist.has(refreshToken)) {
                            reply.clearCookie('access_token')
                            reply.clearCookie('refresh_token')
                            return
                        }

                        refreshTokenBlacklist.add(refreshToken);

                        const token = request.jwt.sign(data)

                        setCookie(reply, 'access_token', token, 8)

                        request.user = data

                    } catch (error: any) {
                        const message = errorMessages[error.message] || "500-default";
                        throw Error(message)
                    }
                }
                const message = errorMessages[error.message] || "500-default";
                throw Error(message)
            }
        }
    );
}