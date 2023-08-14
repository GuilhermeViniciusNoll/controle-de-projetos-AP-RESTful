import { Request, Response } from "express"
import { Dev, DevInfos, createDev, partialDataDev, partialDataDevInfos } from "../interfaces"
import services from "../services/developers.services"

const createDevController = async (req: Request, res: Response): Promise<Response> => {
    const payload: createDev = req.body
    const dev: Dev = await services.createDevService(payload)
    return res.status(201).json(dev)
}

const getDevByIdController = async (req: Request, res: Response): Promise<Response> => {
    const dev: Object = await services.getDevByIdService(req.params.id)
    return res.status(200).json(dev)
}

const pathDevController = async (req: Request, res: Response): Promise<Response> => {
    const payload: partialDataDev = req.body
    const lastData: Dev = res.locals[0]
    const dev: Dev = await services.pathDevService(payload, lastData, req.params.id)
    return res.status(200).json(dev)
}

const deleteDevController = async (req: Request, res: Response): Promise<Response> => {
    const dev: Dev = await services.deleteDevService(req.params.id)
    return res.status(204).json()
}

const postDevInfoController = async (req: Request, res: Response): Promise<Response> => {
    const payload: partialDataDevInfos = {
        ...req.body,
        developerId: req.params.id
    }
    const devInfo: DevInfos = await services.postDevInfoService(payload)
    return res.status(201).json(devInfo)
}

export default { createDevController, getDevByIdController, pathDevController, deleteDevController, postDevInfoController }