import { BaseModel, IBaseModel } from '../models/BaseModel'
import { IRepository } from './IRepository'

export class BaseRepository<T extends IBaseModel> implements IRepository<T> {
  constructor(protected model: BaseModel<T>) {
    this.model = model
  }

  async create(item: Partial<T>): Promise<T> {
    return await this.model.create(item)
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id)
  }

  async findAll(): Promise<T[]> {
    return await this.model.findAll()
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return await this.model.update(id, item)
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.delete(id)
  }
}
