import { IValidator } from 'validators/IValidator'
import { IBaseModel } from '../models/BaseModel'
import { IRepository } from '../repositories/IRepository'
import { BaseService } from '../services/BaseService'
import { MessageBus } from '../utils/MessageBus'
import { IService } from './IService'

export class ServiceBuilder<T extends IBaseModel> {
  private validator!: IValidator<T>
  private messageBus!: MessageBus
  private repository!: IRepository<T>

  setValidator(validator: IValidator<T>): this {
    this.validator = validator
    return this
  }

  setMessageBus(messageBus: MessageBus): this {
    this.messageBus = messageBus
    return this
  }

  setRepository(repository: IRepository<T>): this {
    this.repository = repository
    return this
  }

  build(): IService<T> {
    if (!this.validator || !this.messageBus || !this.repository) {
      throw new Error('Missing required properties to build the service')
    }
    return new BaseService<T>(this.repository, this.messageBus, this.validator)
  }
}
