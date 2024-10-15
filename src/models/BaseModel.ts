import { Document, QueryOptions } from 'mongoose'

export interface IBaseModel extends Document {}

export abstract class BaseModel<T extends IBaseModel> {
  protected abstract model: any

  async create(data: Partial<T>): Promise<T> {
    const item = new this.model(data)
    return await item.save()
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id)
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id)
  }

  async findAll(): Promise<T[]> {
    return await this.model.find()
  }
  async find(query: QueryOptions): Promise<T[]> {
    return this.model.find(query)
  }
}
