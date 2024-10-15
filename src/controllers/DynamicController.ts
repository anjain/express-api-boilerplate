/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { ServiceRegistry } from '../registry/ServiceRegistry'
import { BaseService } from '../services/BaseService'
import { AppError } from '../utils/AppError'
import { catchAsync } from '../utils/catchAsync'

export class DynamicController {
  constructor(private serviceRegistry: ServiceRegistry) {}

  private getService(req: Request): BaseService<any> {
    const modelName = req.params.model + 'Service'
    const service = this.serviceRegistry.getService(modelName)
    if (!service) {
      throw new AppError(404, `Service for model ${modelName} not found`)
    }
    return service
  }

  create = catchAsync(async (req: Request, res: Response) => {
    const service = this.getService(req)
    const item = await service.create(req.body)
    res.status(201).json({ status: 'success', data: item })
  })

  getAll = catchAsync(async (req: Request, res: Response) => {
    const service = this.getService(req)
    const items = await service.findAll()
    res.status(200).json({ status: 'success', data: items })
  })

  update = catchAsync(async (req: Request, res: Response) => {
    const service = this.getService(req)
    const item = await service.update(req.params.id, req.body)
    if (!item) {
      throw new AppError(404, 'Item not found')
    }
    res.status(200).json({ status: 'success', data: item })
  })

  delete = catchAsync(async (req: Request, res: Response) => {
    const service = this.getService(req)
    const item = await service.delete(req.params.id)
    if (!item) {
      throw new AppError(404, 'Item not found')
    }
    res.status(200).json({ message: 'Deleted successfully' })
  })
}
