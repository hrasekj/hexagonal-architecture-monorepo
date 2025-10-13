import { InMemoryUserRepository } from '../infrastructure/repositories/in-memory-user.repository.js'
import type { AppConfig } from './config.types.js'
import type { Container } from './container.types.js'

export const createContainer = async (config: AppConfig): Promise<Container> => {
  const userRepository = new InMemoryUserRepository()

  return {
    userRepository,
  }
}
