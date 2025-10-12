import { User } from '../../domain/entities/user.entity.js'
import type { IUserRepository } from '../../domain/repositories/user.repository.js'
import type { IUseCase } from '../../domain/use-case.js'

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
