import { MessageBus } from '../utils/MessageBus'
import { PetServiceFactory } from './PetServiceFactory'
import { ReligionServiceFactory } from './ReligionServiceFactory'
import { UserServiceFactory } from './UserServiceFactory'

export class FactoryProducer {
  static getFactory(type: string, messageBus: MessageBus): any {
    switch (type.toLowerCase()) {
      case 'pets':
        return new PetServiceFactory(messageBus)
      case 'religions':
        return new ReligionServiceFactory(messageBus)
      case 'users':
        return new UserServiceFactory(messageBus)
      default:
        throw new Error(`Unknown factory type: ${type}`)
    }
  }
}
