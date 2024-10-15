import { IValidator } from 'validators/IValidator'
import { IBaseModel } from '../models/BaseModel'
import { IRepository } from '../repositories/IRepository'
import { AppError } from '../utils/AppError'
import { MessageBus } from '../utils/MessageBus'
import { IService } from './IService'

export class BaseService<T extends IBaseModel> implements IService<T> {
  constructor(
    protected repository: IRepository<T>,
    protected messageBus: MessageBus,
    protected validator: IValidator<T>,
  ) {}

  async create(data: Partial<T>): Promise<T> {
    try {
      const validatedData = this.validator.validate(data)
      const item = await this.repository.create(validatedData)
      this.messageBus.publish(`${this.constructor.name}:created`, item)
      return item
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new AppError(400, error.message)
      }
      throw error
    }
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const validatedData = this.validator.validate(data)
      const item = await this.repository.update(id, validatedData)
      if (item) {
        this.messageBus.publish(`${this.constructor.name}:updated`, item)
      }
      return item
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new AppError(400, error.message)
      }
      throw error
    }
  }

  async delete(id: string): Promise<T | null> {
    const item = await this.repository.delete(id)
    if (item) {
      this.messageBus.publish(`${this.constructor.name}:deleted`, item)
    }
    return item
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll()
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id)
  }
}
