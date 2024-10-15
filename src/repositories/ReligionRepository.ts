import { BaseModel } from 'models/BaseModel'
import { IReligion } from '../models/Religion'
import { BaseRepository } from './BaseRepository'
export class ReligionRepository extends BaseRepository<IReligion> {
  constructor(model: BaseModel<IReligion>) {
    super(model)
  }
}
