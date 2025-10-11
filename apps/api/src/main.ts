import { createServer } from 'node:http'

const startApp = async () => {
  const server = createServer((_req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        data: 'Hello World!',
      }),
    )
  })

  server.listen(8080, () => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log('Server started on port 8080')
  })
}

await startApp()
