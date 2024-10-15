import { IUser, User } from '../models/User'
import { UserRepository } from '../repositories/UserRepository'
import { UserValidator } from '../validators/UserValidator'
import { ServiceFactory } from './ServiceFactory'

export class UserServiceFactory extends ServiceFactory<IUser> {
  protected createValidator() {
    return new UserValidator()
  }

  protected createRepository() {
    return new UserRepository(new User())
  }
}
