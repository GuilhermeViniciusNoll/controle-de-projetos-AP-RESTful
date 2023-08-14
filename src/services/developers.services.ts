import { client } from "../database";
import { Dev, DevInfos, createDev, partialDataDev, partialDataDevInfos, resultDev, resultDevInfos } from "../interfaces";
import { QueryConfig } from "pg";
import format from "pg-format"

const createDevService = async (payload: createDev): Promise<Dev> => {
    const queryConfig: QueryConfig = {
        text: `INSERT INTO developers ("name", "email") VALUES($1, $2) RETURNING *`,
        values: [payload.name, payload.email]
    }
    const dev: resultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const getDevByIdService = async (id: String): Promise<Object> => {
    const queryConfig: QueryConfig = {
        text: `SELECT dev.id "developerId", dev.name "developerName", dev.email "developerEmail", devInfo.developersince "developerInfoDeveloperSince", devInfo.preferredos "developerInfoPreferredOS" 
                FROM developers AS dev LEFT JOIN developerinfos AS devInfo ON dev.id = devInfo.developerid WHERE dev.id = $1;`,
        values: [id]
    }
    const dev: resultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const pathDevService = async (payload: partialDataDev, lastData: Dev, id: String): Promise<Dev> => {
    const updateData: createDev = {
        ...lastData,
        ...payload
    }
    console.log(updateData)
    const queryConfig: QueryConfig = {
        text: format(`UPDATE developers SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;`, Object.keys(updateData), Object.values(updateData)),
        values: [id]
    }
    const dev: resultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const deleteDevService = async (id: String): Promise<Dev> => {
    const queryConfig: QueryConfig = {
        text: `DELETE FROM developers WHERE "id" = $1 RETURNING *;`,
        values: [id]
    }
    const dev: resultDev = await client.query(queryConfig)
    return dev.rows[0]
}

const postDevInfoService = async (payload: partialDataDevInfos): Promise<DevInfos> => {
    const queryConfig: QueryConfig = {
        text: `INSERT INTO developerinfos ("developersince","preferredos","developerid") VALUES ($1,$2,$3) RETURNING *;`,
        values: [payload.developerSince, payload.preferredOS, payload.developerId]
    }
    const dev: resultDevInfos = await client.query(queryConfig)
    return dev.rows[0]
}

export default { createDevService, getDevByIdService, pathDevService, deleteDevService, postDevInfoService }

