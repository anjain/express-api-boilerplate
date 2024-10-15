import { IValidator } from 'validators/IValidator'
import { IBaseModel } from '../models/BaseModel'
import { IRepository } from '../repositories/IRepository'
import { IService } from '../services/IService'
import { ServiceBuilder } from '../services/ServiceBuilder'
import { MessageBus } from '../utils/MessageBus'

export abstract class ServiceFactory<T extends IBaseModel> {
  protected abstract createValidator(): IValidator<T>
  protected abstract createRepository(): IRepository<T>

  constructor(protected messageBus: MessageBus) {}

  createService(): IService<T> {
    const builder = new ServiceBuilder<T>()
      .setValidator(this.createValidator())
      .setMessageBus(this.messageBus)
      .setRepository(this.createRepository())

    return builder.build()
  }
}
