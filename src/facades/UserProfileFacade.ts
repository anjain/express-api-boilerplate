import { BaseService } from 'services/BaseService'
import { IPet } from '../models/Pet'
import { IReligion } from '../models/Religion'
import { IUser } from '../models/User'
import { MessageBus } from '../utils/MessageBus'
import logger from '../utils/logger'

export class UserProfileFacade {
  constructor(
    private userService: BaseService<IUser>,
    private religionService: BaseService<IReligion>,
    private petService: BaseService<IPet>,
    private messageBus: MessageBus,
  ) {}

  async createUserProfile(
    userData: Partial<IUser>,
    religionData: Partial<IReligion>,
    petData: Partial<IPet>,
  ) {
    try {
      // Create user
      const user: IUser = await this.userService.create(userData)

      // Create religion and associate with user
      const religion = await this.religionService.create({
        ...religionData,
        userId: user._id as string,
      })

      // Create pet and associate with user
      const pet = await this.petService.create({
        ...petData,
        userId: user._id as string,
      })

      // Publish an event for the completed profile creation
      this.messageBus.publish('UserProfile:created', { user, religion, pet })

      return { user, religion, pet }
    } catch (error) {
      logger.error('Error creating user profile:', error)
      throw error
    }
  }
}
