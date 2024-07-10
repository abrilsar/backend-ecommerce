import { model } from 'mongoose';
import { hash } from 'argon2';
import { productSchema } from '@avila-tek/models';

/**
 * @async
 * @function
 * @description Hashes password with module argon2 before saving it in database every time it is modified
 * @listens userSchema:save
 * @param next {CallbackWithoutResultAndOptionalError}
 * @requires argon2
 * @since 1.0.0
 * @summary Hashes password
 * @version 1
 */

export const Product = model('Product', productSchema);
