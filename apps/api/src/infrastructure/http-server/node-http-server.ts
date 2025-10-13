import { createServer } from 'node:http'
import type { IApplication } from '../../application/interfaces/application.js'
import type { AppConfig } from '../../bootstrap/config.types.js'
import type { Container } from '../../bootstrap/container.types.js'

export const createNodeHttpServerApplication = async (
  config: AppConfig,
  container: Container,
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
      server.listen(8080, () => {
        // biome-ignore lint/suspicious/noConsole: application level without bootstraped logger
        console.info('SERVER: started listening on port 8080')
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
