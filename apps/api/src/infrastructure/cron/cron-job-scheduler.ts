import type { IApplication } from '../../application/interfaces/application.js'
import type { Container } from '../../bootstrap/container.types.js'

interface CronJobSchedulerConfig {
  //
}

export const createCronJobScheduler = async (
  container: Container,
  config: CronJobSchedulerConfig,
): Promise<IApplication> => {
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
