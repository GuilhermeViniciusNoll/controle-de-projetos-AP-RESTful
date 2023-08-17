import appError from "../errors"
import { client } from "../database"
import { QueryConfig } from "pg"
import { NextFunction, Request, Response } from "express"
import { TResultDev } from "../interfaces"

const existIdMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (typeof req.body.developerId != "undefined") {
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM developers WHERE "id" = $1;`,
            values: [req.body.developerId]
        }
        const dev: TResultDev = await client.query(queryConfig)
        res.locals = dev.rows[0]
        if (dev.rows.length === 0) throw new appError("Developer not found.", 404)
        return next()
    }
    return next()
}

export default existIdMiddleware