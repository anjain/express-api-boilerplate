import { IPetRepository } from 'repositories/IPetRepository'
import { MessageBus } from 'utils/MessageBus'
import { IValidator } from 'validators/IValidator'
import { IPet } from '../models/Pet'
import { BaseService } from './BaseService'
import { IPetService } from './IPetService'

export class PetService extends BaseService<IPet> implements IPetService {
  constructor(
    private petRepository: IPetRepository,
    messageBus: MessageBus,
    validator: IValidator<IPet>,
  ) {
    super(petRepository, messageBus, validator)
  }

  async findByOwner(ownerId: string): Promise<IPet[]> {
    return this.petRepository.findByOwnerId(ownerId)
  }
}
