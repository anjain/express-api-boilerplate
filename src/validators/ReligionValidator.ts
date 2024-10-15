import Joi from 'joi'
import { BaseValidator } from './BaseValidator'
import { IReligion } from '../models/Religion'

export class ReligionValidator extends BaseValidator<IReligion> {
  protected schema = Joi.object<IReligion>({
    name: Joi.string().required(),
    followers: Joi.number().integer().min(0),
    userId: Joi.string().required(),
  })
}
