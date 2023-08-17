import appError from "../errors"
import { client } from "../database"
import { QueryConfig } from "pg"
import { NextFunction, Request, Response } from "express"
import { TResultDevInfo } from "../interfaces"

const uniqueInfosMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryConfig: QueryConfig = {
        text: `SELECT "id" FROM "developerInfos" WHERE "developerId" = $1;`,
        values: [req.params.id]
    }
    const dev: TResultDevInfo = await client.query(queryConfig)
    if (dev.rowCount === 0) return next()
    throw new appError("Developer infos already exists.", 409)
}

export default uniqueInfosMiddleware