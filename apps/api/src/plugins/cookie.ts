import type { FastifyInstance, FastifyReply } from 'fastify';
import fCookie from '@fastify/cookie'

export async function cookiePlugin(server: FastifyInstance) {
    await server.register(fCookie, {
        secret: process.env.COOKIE_SECRET,
        hook: 'preHandler'
    })
}


export async function setCookie(reply: FastifyReply, name: string, value: string, expired: number) {
    reply.setCookie(name, value, {
        path: '/',
        expires: new Date(Date.now() + expired * 60 * 60 * 1000),
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}