import { createServer, type Server } from 'node:http'
import type { IApplication } from '../../domain/application.js'
import { InMemoryUserRepository } from '../repositories/in-memory-user.repository.js'

export const createNodeHttpServerApplication = async (config: Record<string, any>): Promise<IApplication> => {
  let server: Server | undefined

  const userRepository = new InMemoryUserRepository()

  // TODO initialize whole container here

  return {
    container: {
      userRepo: userRepository,
    },

    async start() {
      server = createServer(async (_req, res) => {
        const user = await userRepository.findById(1)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            data: 'Hello World!',
            user: user?.getData() ?? null,
          }),
        )
      })

      server.listen(8080, () => {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.info('SERVER: started listening on port 8080')
      })
    },

    async stop() {
      server?.close((error) => {
        if (error) {
          // biome-ignore lint/suspicious/noConsole: <explanation>
          console.error('SERVER: Error while closing server:', error)
        }
      })

      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.info('SERVER: HttpServer stopped')
    },
  }
}
