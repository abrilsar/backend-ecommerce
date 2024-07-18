import { PaginationOptions, PaginationResults } from "@/types/types";
import mongoose, { FilterQuery, Model } from "mongoose";

export async function paginate(model: Model<any>, options: PaginationOptions): Promise<PaginationResults> {

    const { limit, cursor, direction, query} = options;


    if (typeof limit !== "number" || limit <= 0) {
        throw new Error("400-default");
    }

    if (cursor && !mongoose.Types.ObjectId.isValid(cursor)) {
        throw Error('400-default');
    }

    if (!["next", "prev"].includes(direction)) {
        throw new Error("400-default");
    }

    const filter: FilterQuery<any> = query;
    const sortOptions: any = {
        _id: direction === 'next' ? 1 : -1
    };

    let hasPrev = cursor !== undefined
    let hasNext = undefined

    if (cursor) {
        const cursorId = new mongoose.Types.ObjectId(cursor);
        filter._id = direction === 'next' ? { $gt: cursorId, $ne: cursorId } : { $lt: cursorId, $ne: cursorId };

        if (direction === 'prev') {
            const prevCount = await model.countDocuments({
                _id: { $lt: cursorId },
                ...query
            });
            hasPrev = (prevCount - limit) > 0;
        }
        if (direction === 'prev') {
            const prevCount = await model.countDocuments({
                _id: { $lt: cursorId },
                ...query
            });
            hasPrev = (prevCount - limit) > 0;
        }

        if (direction === 'next') {
            const nextCount = await model.countDocuments({
                _id: { $gt: cursorId },
                ...query
            });
            hasNext = nextCount > limit;
        }
    }


    try {
        const results = await model.aggregate([
            { $match: filter },
            { $sort: sortOptions },
            { $limit: limit },
            { $sort: { _id: 1 } }
        ]);

        hasNext = hasNext === undefined ? results.length === limit : hasNext


        const nextCursor = hasNext ? results[results.length - 1]._id.toString() : 0
        const prevCursor = hasPrev ? results[0]._id.toString() : 0

        return {
            results,
            hasNext,
            nextCursor: nextCursor,
            hasPrev,
            prevCursor: prevCursor,
        };

    } catch (error) {
        throw new Error('400-default');
    }
}



export const getQuery = (userQueryString: string) => {
    let userQuery: FilterQuery<any> = {};

    let queryPairs = userQueryString.split('-');
    for (let pair of queryPairs) {
        let [key, value] = pair.split('=');
        userQuery[key!.trim()] = value!.trim();
    }

    return userQuery
}