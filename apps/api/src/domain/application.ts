export interface IApplication {
  readonly container: Record<string, any>

  start(): Promise<void>
  stop(): Promise<void>
}
