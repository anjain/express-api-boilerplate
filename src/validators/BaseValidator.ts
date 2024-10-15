import Joi from 'joi'
import { IValidator } from './IValidator'

export abstract class BaseValidator<T> implements IValidator<T> {
  protected abstract schema: Joi.ObjectSchema<T>

  validate(data: unknown): T {
    const { error, value } = this.schema.validate(data, { abortEarly: false })
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '))
    }
    return value
  }
}
