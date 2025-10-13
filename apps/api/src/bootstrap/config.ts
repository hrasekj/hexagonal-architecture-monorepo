import type { AppConfig } from './config.types.js'

export const parseConfig = (env: any): AppConfig => {
  const config = {
    port: parseInt(env.PORT ?? '8080', 10),
    host: env.HOST ?? 'localhost',
  }

  return config
}
