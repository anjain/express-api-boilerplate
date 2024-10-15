import { Schema, model } from 'mongoose'
import { BaseModel, IBaseModel } from './BaseModel'

export interface IUser extends IBaseModel {
  name: string
  email: string
  password: string
  role: string
}

const schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
  },
  { timestamps: true },
)

export class User extends BaseModel<IUser> {
  protected model = model<IUser>('User', schema)
}
