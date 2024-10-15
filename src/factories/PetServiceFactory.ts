import { IPetRepository } from 'repositories/IPetRepository'
import { PetRepository } from 'repositories/PetRepository'
import { PetValidator } from 'validators/PetValidator'
import { IPet, Pet } from '../models/Pet'
import { IPetService } from '../services/IPetService'
import { PetService } from '../services/PetService'
import { IValidator } from '../validators/IValidator'
import { ServiceFactory } from './ServiceFactory'

export class PetServiceFactory extends ServiceFactory<IPet> {
  protected createValidator(): IValidator<IPet> {
    return new PetValidator()
  }

  protected createRepository(): IPetRepository {
    return new PetRepository(new Pet())
  }

  createService(): IPetService {
    return new PetService(
      this.createRepository(),
      this.messageBus,
      this.createValidator(),
    )
  }
}
