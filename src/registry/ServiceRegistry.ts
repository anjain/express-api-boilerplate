/* eslint-disable @typescript-eslint/no-explicit-any */
import { FactoryProducer } from '../factories/FactoryProducer'
import { BaseService } from '../services/BaseService'
import { MessageBus } from '../utils/MessageBus'

export class ServiceRegistry {
  private services: Map<string, BaseService<any>> = new Map()
  private messageBus: MessageBus

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus
  }

  registerService(name: string, type: string): void {
    const factory = FactoryProducer.getFactory(type, this.messageBus)
    const service = factory.createService()
    this.services.set(name, service)
  }

  getService(name: string): BaseService<any> | undefined {
    return this.services.get(name)
  }

  getAllServices(): Map<string, BaseService<any>> {
    return this.services
  }
}
