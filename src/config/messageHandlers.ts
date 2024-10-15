import { MessageBus } from '../utils/MessageBus'
import logger from '../utils/logger'

export function setupMessageHandlers(messageBus: MessageBus): void {
  messageBus.subscribe('Pet:created', pet => {
    logger.info(`New pet created: ${pet.name}`)
  })

  messageBus.subscribe('Religion:created', religion => {
    logger.info(`New religion created: ${religion.name}`)
  })

  messageBus.subscribe('UserProfile:created', data => {
    logger.info(`New user profile created: ${data.user.name}`)
  })
}
