import { User } from '../../domain/entities/user.entity.js'
import type { IUserRepository } from '../../domain/repositories/user.repository.js'

export class InMemoryUserRepository implements IUserRepository {
  #users: User[] = []
  #nextId = 1

  constructor() {
    this.seedData()
  }

  private seedData(): void {
    const now = new Date()

    this.#users.push(
      User.fromRecord({
        id: this.#nextId++,
        name: 'John Doe',
        email: 'john.doe@example.com',
        photoUrl: 'https://example.com/photos/john.jpg',
        slackId: 'U123456789',
        createdAt: now,
      }),
      User.fromRecord({
        id: this.#nextId++,
        name: 'Jane Doe',
        email: 'jane@example.com',
        photoUrl: 'https://example.com/photos/jane.jpg',
        slackId: 'U987654321',
        createdAt: now,
      }),
      User.fromRecord({
        id: this.#nextId++,
        name: 'Alice Smith',
        email: 'alice@example.com',
        photoUrl: 'https://example.com/photos/alice.jpg',
        slackId: 'U567890123',
        createdAt: now,
      }),
    )
  }

  async findById(id: number): Promise<User | undefined> {
    return this.#users.find((user) => user.id === id)
  }

  async create(input: User): Promise<User> {
    const savedUser = input.clone(undefined, this.#nextId++)

    this.#users.push(savedUser)

    return savedUser
  }
}
