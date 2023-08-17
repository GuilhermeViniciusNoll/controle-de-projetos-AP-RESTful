import { NextFunction, Request, Response } from "express"
import { resultDev } from "../interfaces"
import { client } from "../database"
import { QueryConfig } from "pg"
import appError from "../errors"

const existIdMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log( typeof req.body.developerId)
    if (typeof req.body.developerId != "undefined") {
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM developers WHERE "id" = $1;`,
            values: [req.body.developerId]
        }
        const dev: resultDev = await client.query(queryConfig)
        res.locals = dev.rows[0]
        if (dev.rows.length === 0) throw new appError("Developer not found.", 404)
        return next()
    }
    next()
}

export default existIdMiddleware