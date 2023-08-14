import { QueryResult } from "pg"

type DevInfos = {
    id: Number,
    developerSince: Date,
    preferredOS: "Windows" | "Linux" | "MacOS" ,
    developerId: Number
}

type createDevInfos = Omit<DevInfos, "id">
type partialDataDevInfos = Partial<DevInfos>
type resultDevInfos = QueryResult<DevInfos>

export { DevInfos, createDevInfos, partialDataDevInfos, resultDevInfos }