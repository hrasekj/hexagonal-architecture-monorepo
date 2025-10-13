import type { User } from '../../domain/entities/user.entity.js'

export interface IUserRepository {
  findById(id: number): Promise<User | undefined>
  create(input: User): Promise<User>
}
