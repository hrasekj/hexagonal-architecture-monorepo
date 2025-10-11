import type { ReadonlyDeep } from 'type-fest'

export interface Entity<TData, TId = number> {
  readonly id: TId | undefined

  /**
   * Discourage modifications to the underlying data in domain types
   */
  clone(overrides?: Partial<TData>): Entity<TData, TId>

  /**
   * Motivate the developer to only hold validated data and to protect them as much as possible.
   */
  getData(): EntityData<TData>
}

/**
 * TypeScript only guarantees structural validity of the data.
 * It won't alert on more complex constraints like "length" and etc.
 *
 * This utility type should be used everywhere where we expect the underlying type to adhere to stricter rules than TS provides.
 * At the same time, we don't want to create a class for every little data point so use this instead.
 */
export type Validated<TData> = TData extends object
  ? TData & {
      // Safeguard to nudge developers into adhering to best practices
      __dataIsTrulyValid: true
    }
  : TData

export type EntityData<TData> = Validated<ReadonlyDeep<TData>>
