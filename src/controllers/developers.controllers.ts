import services from "../services/developers.services"
import { Request, Response } from "express"
import { IDev, IDevInfo, TCreateDev, TPartialDev, TPartialDevInfo } from "../interfaces"

const createDevController = async (req: Request, res: Response): Promise<Response> => {
    const payload: TCreateDev = req.body
    const dev: IDev = await services.createDevService(payload)
    return res.status(201).json(dev)
}

const getDevByIdController = async (req: Request, res: Response): Promise<Response> => {
    const dev: TPartialDev & TPartialDevInfo = await services.getDevByIdService(req.params.id)
    return res.status(200).json(dev)
}

const pathDevController = async (req: Request, res: Response): Promise<Response> => {
    const payload: TPartialDev = req.body
    const lastData: IDev = res.locals[0]
    const dev: IDev = await services.pathDevService(payload, lastData, req.params.id)
    return res.status(200).json(dev)
}

const deleteDevController = async (req: Request, res: Response): Promise<Response> => {
    const dev: IDev = await services.deleteDevService(req.params.id)
    return res.status(204).json()
}

const postDevInfoController = async (req: Request, res: Response): Promise<Response> => {
    const payload: TPartialDevInfo = {
        ...req.body,
    }
    const devInfo: IDevInfo = await services.postDevInfoService(payload, req.params.id)
    return res.status(201).json(devInfo)
}

export default { createDevController, getDevByIdController, pathDevController, deleteDevController, postDevInfoController }