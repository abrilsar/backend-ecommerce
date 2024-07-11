import jwt from 'jsonwebtoken';
import { TSignInInput } from './auth.dto';
import { User } from '@/components/users/user.model';
import { userDefinition } from '@avila-tek/models';
import { verify } from 'argon2';
import { FastifyRequest } from 'fastify';

/**
 * @async
 * @function
 * @description This function mocks user authentication using a JWT
 * @implements TSignInInput
 * @listens auth.controller:signIn
 * @param data {TSignInInput}
 * @requires jsonwebtoken
 * @returns {object} Object with user object and its token as a string
 * @see user.model
 * @since 1.0.0
 * @summary Sign In
 * @todo Get user from database
 * @version 1
 */

async function signIn(req: FastifyRequest<{ Body: TSignInInput }>) {
  const {email, password} = req.body

  try {
    
    let user = await User.findOne({email})

    if(!user){
      throw Error('401-invalidCredentials')
    }

    const valid = await verify(user.password, password)

    if(!valid){
      throw Error('401-invalidPassword')
    }
    const token = req.jwt.sign(user.toJSON())

    return {
      user,
      token,
    };

  } catch (error: any) {
    console.log("Erorr: ", error)
    throw Error(error.message === ''? '500-default': error.message)
  }
}

async function register(req: FastifyRequest<{ Body: typeof userDefinition._type }>) {
const {email} = req.body
  try {
    let user = await User.findOne({email})

    if (user){
      throw Error('409-userAlreadyExists')
    }
    user = new User(req.body)
    
    await user.save()

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET!, {expiresIn: '2h'});
    
    return {
      user,
      token,
    };

  } catch (error: any) {
    throw Error(error.message === ''? '500-default': error.message)
  }


}

export const authService = Object.freeze({
  signIn,
  register,
});
