import type { User } from '../entities/user.entity.js'

export interface IUserRepository {
  create(input: User): Promise<User>
}
