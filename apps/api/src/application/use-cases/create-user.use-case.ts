import { User } from '../../domain/entities/user.entity.js'
import type { IUseCase } from '../interfaces/use-case.js'
import type { IUserRepository } from '../repositories/user.repository.js'

export class CreateUser implements IUseCase {
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
