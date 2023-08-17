import { QueryResult } from "pg"

interface IDevInfo {
    id: Number,
    developerSince: Date,
    preferredOS: "Windows" | "Linux" | "MacOS",
    developerId: Number
}

type TCreateDevInfo = Omit<IDevInfo, "id">
type TPartialDevInfo = Partial<IDevInfo>
type TResultDevInfo = QueryResult<IDevInfo>

export { IDevInfo, TCreateDevInfo, TPartialDevInfo, TResultDevInfo }