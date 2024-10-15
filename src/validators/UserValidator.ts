import Joi from 'joi'
import { BaseValidator } from './BaseValidator'
import { IUser } from '../models/User'

export class UserValidator extends BaseValidator<IUser> {
  protected schema = Joi.object<IUser>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'user').default('user'),
  })
}
