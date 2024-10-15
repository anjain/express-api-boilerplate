import { BaseModel } from 'models/BaseModel'
import { IUser } from '../models/User'
import { BaseRepository } from './BaseRepository'

export class UserRepository extends BaseRepository<IUser> {
  constructor(model: BaseModel<IUser>) {
    super(model)
  }
}
