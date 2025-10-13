import type { IUserRepository } from '../application/repositories/user.repository.js'

export interface Container {
  userRepository: IUserRepository
}
