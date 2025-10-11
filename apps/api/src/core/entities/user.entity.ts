import { z } from 'zod'
import { validate } from '../lib/zod.js'
import type { Entity, EntityData } from './entity.js'
import type { UserRecord } from './user.record.js'

export class User implements Entity<UserData> {
  static schema = z.object({
    email: z.email(),
    photoUrl: z.url().optional(),
    slackId: z.string().optional(),
    createdAt: z.date(),
  })

  #data: EntityData<UserData>
  #pk: number

  private constructor(data: EntityData<UserData>, pk: number = -1) {
    this.#data = data
    this.#pk = pk
  }

  static createNew(input: NewUserData): User {
    const data = {
      email: input.email,
      photoUrl: input.photoUrl,
      slackId: input.slackId,
      createdAt: new Date(),
    }

    validate(data, User.schema, 'User')

    return new User({ ...data, __dataIsTrulyValid: true })
  }

  static fromRecord(record: UserRecord): User {
    const data = {
      email: record.email,
      photoUrl: record.photoUrl ?? undefined,
      slackId: record.slackId ?? undefined,
      createdAt: new Date(record.createdAt),
    }

    validate(data, User.schema, 'User')

    return new User({ ...data, __dataIsTrulyValid: true }, record.id)
  }

  get id(): number {
    return this.#pk
  }

  clone(overrides?: Partial<UserData>): User {
    return new User({ ...this.#data, ...overrides }, this.#pk)
  }

  getData(): EntityData<UserData> {
    return this.#data
  }
}

export type UserData = z.infer<typeof User.schema>

type NewUserData = Omit<UserData, 'createdAt'>
