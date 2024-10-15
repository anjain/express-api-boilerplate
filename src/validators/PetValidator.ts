import Joi from 'joi'
import { BaseValidator } from './BaseValidator'
import { IPet } from '../models/Pet'

export class PetValidator extends BaseValidator<IPet> {
  protected schema = Joi.object<IPet>({
    name: Joi.string().required(),
    species: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
    userId: Joi.string().required(),
  })
}
