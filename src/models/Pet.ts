import { model, Schema } from 'mongoose'
import { BaseModel, IBaseModel } from './BaseModel'

export interface IPet extends IBaseModel {
  name: string
  species: string
  age: number
  userId: string
}

const schema = new Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

export class Pet extends BaseModel<IPet> {
  protected model = model<IPet>('Pet', schema)
}
