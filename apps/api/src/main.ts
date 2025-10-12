import { registerShutdownSignalHandlers } from './application/shutdow-handler.js'
import { createNodeHttpServerApplication } from './infrastructure/application/node-http-server.js'
import { parseApiConfig } from './infrastructure/config/index.js'

const startApp = async () => {
  const config = parseApiConfig(process.env)
  const app = await createNodeHttpServerApplication(config)

  await app.start()

  registerShutdownSignalHandlers(async () => {
    await app.stop()
  })
}

await startApp()
