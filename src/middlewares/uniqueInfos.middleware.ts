import { NextFunction, Request, Response } from "express"
import schemas from "../schemas"
import { resultDevInfos } from "../interfaces"
import { client } from "../database"
import { QueryConfig } from "pg"
import appError from "../errors"

const uniqueInfosMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryConfig: QueryConfig = {
        text: `SELECT "id" FROM "developerInfos" WHERE "developerId" = $1;`,
        values: [req.params.id]
    }
    const dev: resultDevInfos = await client.query(queryConfig)
    if (dev.rowCount === 0) return next()
    throw new appError("Developer infos already exists.", 409)
}

export default uniqueInfosMiddleware