import { IPet } from '../models/Pet'
import { IRepository } from './IRepository'

export interface IPetRepository extends IRepository<IPet> {
  findByOwnerId(ownerId: string): Promise<IPet[]>
}
