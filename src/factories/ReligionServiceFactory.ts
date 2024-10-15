import { IReligion, Religion } from '../models/Religion'
import { ReligionRepository } from '../repositories/ReligionRepository'
import { ReligionValidator } from '../validators/ReligionValidator'
import { ServiceFactory } from './ServiceFactory'

export class ReligionServiceFactory extends ServiceFactory<IReligion> {
  protected createValidator() {
    return new ReligionValidator()
  }

  protected createRepository() {
    return new ReligionRepository(new Religion())
  }
}
