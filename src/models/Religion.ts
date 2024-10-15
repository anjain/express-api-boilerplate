import { model, Schema } from 'mongoose'
import { BaseModel, IBaseModel } from '../models/BaseModel'

export interface IReligion extends IBaseModel {
  name: string
  followers: number
  userId: string
}

const schema = new Schema<IReligion>({
  name: { type: String, required: true },
  followers: { type: Number, default: 0 },
})

export class Religion extends BaseModel<IReligion> {
  protected model = model<IReligion>('Religion', schema)
}
