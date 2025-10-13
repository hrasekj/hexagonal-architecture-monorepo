import type { IApplication } from '../../application/interfaces/application.js'
import type { AppConfig } from '../../bootstrap/config.types.js'
import type { Container } from '../../bootstrap/container.types.js'

export const createCronJobScheduler = async (config: AppConfig, container: Container): Promise<IApplication> => {
  // TODO

  return {
    async start() {
      // TODO
    },
    async stop() {
      // TODO
    },
  }
}
