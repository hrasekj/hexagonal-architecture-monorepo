import type { User } from '../entities/user.entity.js'

export interface IUserRepository {
  findById(id: number): Promise<User | undefined>
  create(input: User): Promise<User>
}
