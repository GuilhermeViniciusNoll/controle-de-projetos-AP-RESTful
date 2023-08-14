import { NextFunction, Request, Response } from "express"
import schemas from "../schemas"
import { resultDev, resultDevInfos } from "../interfaces"
import { client } from "../database"
import { QueryConfig } from "pg"
import appError from "../errors"

const uniqueInfosMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isValidId: boolean = schemas.validIdSchema(req.params.id)
    if (!isValidId) {
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM developerinfos WHERE "developerid" = $1;`,
            values: [req.params.id]
        }
        const dev: resultDevInfos = await client.query(queryConfig)
        if (dev.rows.length === 0) return next()
        throw new appError("Developer infos already exists.", 409)
    }
    throw new appError("Invalid Id format.", 400)
}

export default uniqueInfosMiddleware