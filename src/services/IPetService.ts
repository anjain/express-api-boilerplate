import { IPet } from '../models/Pet'
import { IService } from './IService'

export interface IPetService extends IService<IPet> {
  // Adding pet-specific methods here
  findByOwner(ownerId: string): Promise<IPet[]>
}
