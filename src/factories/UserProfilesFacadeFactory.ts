import { UserProfileFacade } from '../facades/UserProfileFacade'
import { FactoryProducer } from './FactoryProducer'
import { MessageBus } from '../utils/MessageBus'

export class UserProfileFacadeFactory {
  static createFacade(messageBus: MessageBus): UserProfileFacade {
    const userService = FactoryProducer.getFactory(
      'user',
      messageBus,
    ).createService()
    const religionService = FactoryProducer.getFactory(
      'religion',
      messageBus,
    ).createService()
    const petService = FactoryProducer.getFactory(
      'pet',
      messageBus,
    ).createService()

    return new UserProfileFacade(
      userService,
      religionService,
      petService,
      messageBus,
    )
  }
}
