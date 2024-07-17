import { PaginationOptions, PaginationResults } from "@/types/types";
import mongoose, { FilterQuery, Model } from "mongoose";

export async function paginate(model: Model<any>, options: PaginationOptions): Promise<PaginationResults> {

    const { limit, cursor, direction, query } = options;


    if (typeof limit !== "number" || limit <= 0) {
    throw new Error("Invalid limit parameter");
    }
    
    if (cursor && !mongoose.Types.ObjectId.isValid(cursor)) {
        throw Error('Invalid cursor');
    }
    
    if (!["next", "prev"].includes(direction)) {
        throw new Error("Invalid direction parameter");
    }

    const filter: FilterQuery<any> = { ...query };
    const sortOptions: any = { _id: direction === 'next' ? 1 : -1 };

    let hasPrev = cursor !== undefined 

  if (cursor) {
    const cursorId = new mongoose.Types.ObjectId(cursor);
    filter._id = direction === 'next' ? { $gt: cursorId, $ne: cursorId } : { $lt: cursorId, $ne: cursorId };
   
    if (direction === 'prev'){
        const prevCount = await model.countDocuments({
            _id: { $lt: cursorId },
            ...query
        });
        console.log('Jp;asdasd: ', prevCount - limit)
        hasPrev = (prevCount - limit) > 0;
    }
}
    

  try {
    const results = await model.aggregate([
        { $match: filter },
        { $sort: sortOptions},
        { $limit: limit},
        { $sort: { _id: 1 } }
    ]);

    const hasNext = results.length === limit;
   

    const nextCursor = hasNext ? results[results.length - 1]._id.toString() : undefined 
    const prevCursor = hasPrev ? results[0]._id.toString() : undefined

    return {
      results,
      hasNext,
      hasPrev,
      nextCursor: nextCursor,
      prevCursor: prevCursor,
    };

      } catch (error) {
        console.error(error);
        throw new Error('Error fetching data');
      }
}

