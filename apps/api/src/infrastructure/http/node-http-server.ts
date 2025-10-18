import { createServer } from 'node:http'
import type { IApplication } from '../../application/interfaces/application.js'
import type { Container } from '../../bootstrap/container.types.js'

interface NodeHttpServerConfig {
  port: number
}

export const createNodeHttpServerApplication = async (
  container: Container,
  config: NodeHttpServerConfig,
): Promise<IApplication> => {
  const server = createServer(async (_req, res) => {
    const user = await container.userRepository.findById(1)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        data: 'Hello World!',
        user: user?.getData() ?? null,
      }),
    )
  })

  return {
    async start() {
      server.listen(config.port, () => {
        // biome-ignore lint/suspicious/noConsole: application level without bootstraped logger
        console.info(`SERVER: started listening on port ${config.port}`)
      })
    },

    async stop() {
      server?.close((error) => {
        if (error) {
          // biome-ignore lint/suspicious/noConsole: application level without bootstraped logger
          console.error('SERVER: Error while closing server:', error)
        }
      })

      // biome-ignore lint/suspicious/noConsole: application level without bootstraped logger
      console.info('SERVER: HttpServer stopped')
    },
  }
}
