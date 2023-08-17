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
        text: `SELECT dev.id "developerId", dev.name "developerName", dev.email "developerEmail", devinfo."developerSince" "developerInfoDeveloperSince", devinfo."preferredOS" "developerInfoPreferredOS" 
                FROM developers AS dev LEFT JOIN "developerInfos" AS devinfo ON dev.id = devinfo."developerId" WHERE dev.id = $1;`,
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

const postDevInfoService = async (payload: partialDataDevInfos, devId: String): Promise<DevInfos> => {
    const queryConfig: QueryConfig = {
        text: `INSERT INTO "developerInfos" ("developerSince","preferredOS","developerId") VALUES ($1,$2,$3) RETURNING *;`,
        values: [payload.developerSince, payload.preferredOS, devId]
    }
    const dev: resultDevInfos = await client.query(queryConfig)
    return dev.rows[0]
}

export default { createDevService, getDevByIdService, pathDevService, deleteDevService, postDevInfoService }

