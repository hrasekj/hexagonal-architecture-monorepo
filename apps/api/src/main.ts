import { parseConfig } from './bootstrap/config.js'
import { createContainer } from './bootstrap/container.js'
import { createNodeHttpServerApplication } from './infrastructure/http/node-http-server.js'
import { registerShutdownSignalHandlers } from './infrastructure/system/shutdow-handler.js'

const startApp = async () => {
  const config = parseConfig(process.env)
  const container = await createContainer(config)

  const app = await createNodeHttpServerApplication(config, container)

  await app.start()

  registerShutdownSignalHandlers(async () => {
    await app.stop()
  })
}

await startApp()
