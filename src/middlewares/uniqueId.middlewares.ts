import schemas from "../schemas"
import appError from "../errors"
import { client } from "../database"
import { QueryConfig } from "pg"
import { NextFunction, Request, Response } from "express"
import { TResultDev } from "../interfaces"

const uniqueIdMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isValidId: boolean = schemas.validIdSchema(req.params.id)
    if (!isValidId) {
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM developers WHERE "id" = $1;`,
            values: [req.params.id]
        }
        const dev: TResultDev = await client.query(queryConfig)
        res.locals = dev.rows[0]
        if (dev.rows.length === 0) throw new appError("Developer not found.", 404)
        return next()
    }
    throw new appError("Invalid Id format.", 400)
}

export default uniqueIdMiddleware