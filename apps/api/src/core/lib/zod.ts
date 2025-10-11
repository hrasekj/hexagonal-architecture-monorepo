import type { ZodType } from 'zod'
import { ValidationError } from './errors.js'

export const validate = (data: unknown, schema: ZodType, schemaName: string): void => {
  const result = schema.safeParse(data)

  if (!result.success) {
    // TODO improve error data
    throw new ValidationError(`The data for the "${schemaName}" are not valid!`)
  }
}
