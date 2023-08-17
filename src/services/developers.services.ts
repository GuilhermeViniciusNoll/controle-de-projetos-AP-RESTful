import format from "pg-format"
import appError from "../errors"
import { client } from "../database"
import { QueryConfig } from "pg"
import { IDev, IDevInfo, TCreateDev, TPartialDev, TPartialDevInfo, TResultDev, TResultDevInfo } from "../interfaces"

const createDevService = async (payload: TCreateDev): Promise<IDev> => {
    const queryConfig: QueryConfig = {
        text: `INSERT INTO developers ("name", "email") VALUES($1, $2) RETURNING *`,
        values: [payload.name, payload.email]
    }
    const dev: TResultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const getDevByIdService = async (id: String): Promise<TPartialDev & TPartialDevInfo> => {
    const queryConfig: QueryConfig = {
        text: `SELECT dev.id "developerId", dev.name "developerName", dev.email "developerEmail", devinfo."developerSince" "developerInfoDeveloperSince", devinfo."preferredOS" "developerInfoPreferredOS" 
                FROM developers AS dev LEFT JOIN "developerInfos" AS devinfo ON dev.id = devinfo."developerId" WHERE dev.id = $1;`,
        values: [id]
    }
    const dev: TResultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const pathDevService = async (payload: TPartialDev, lastData: IDev, id: String): Promise<IDev> => {
    const updateData: Omit<IDev, "id"> = {
        ...lastData,
        ...payload
    }
    const queryConfig: QueryConfig = {
        text: format(`UPDATE developers SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;`, Object.keys(updateData), Object.values(updateData)),
        values: [id]
    }
    const dev: TResultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const deleteDevService = async (id: String): Promise<IDev> => {
    const queryConfig: QueryConfig = {
        text: `DELETE FROM developers WHERE "id" = $1 RETURNING *;`,
        values: [id]
    }
    const dev: TResultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const postDevInfoService = async (payload: TPartialDevInfo, devId: String): Promise<IDevInfo> => {
    if (payload.preferredOS != "MacOS" && payload.preferredOS != "Linux" && payload.preferredOS != "Windows") throw new appError("Invalid OS option.", 404)
    const queryConfig: QueryConfig = {
        text: `INSERT INTO "developerInfos" ("developerSince","preferredOS","developerId") VALUES ($1,$2,$3) RETURNING *;`,
        values: [payload.developerSince, payload.preferredOS, devId]
    }
    const dev: TResultDevInfo = await client.query(queryConfig)
    return dev.rows[0]
}

export default { createDevService, getDevByIdService, pathDevService, deleteDevService, postDevInfoService }