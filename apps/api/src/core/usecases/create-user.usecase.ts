import { User } from '../entities/user.entity.js'
import type { IUserRepository } from '../repositories/user.repository.js'
import type { IUseCase } from './usecase.js'

export class CreateUserUseCase implements IUseCase {
  #userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.#userRepository = userRepository
  }

  async execute(input: CreateUserInput): Promise<User> {
    const user = User.createNew(input)

    return this.#userRepository.create(user)
  }
}

interface CreateUserInput {
  email: string
}
