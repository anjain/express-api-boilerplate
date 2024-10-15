import { IBaseModel } from 'models/BaseModel'

export interface IService<T extends IBaseModel> {
  create(data: Partial<T>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T | null>
  delete(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
}
