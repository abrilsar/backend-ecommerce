import { model } from 'mongoose';
import { productSchema } from '@avila-tek/models';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";


export const Product = model('Product', productSchema);
