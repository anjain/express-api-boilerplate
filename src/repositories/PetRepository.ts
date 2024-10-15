import { BaseModel } from 'models/BaseModel'
import { IPet } from '../models/Pet'
import { BaseRepository } from './BaseRepository'

export class PetRepository extends BaseRepository<IPet> {
  constructor(model: BaseModel<IPet>) {
    super(model)
  }
  findByOwnerId(ownerId: string): Promise<IPet[]> {
    return this.model.find({ userId: ownerId })
  }
}
