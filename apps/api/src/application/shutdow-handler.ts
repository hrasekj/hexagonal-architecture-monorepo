export const registerShutdownSignalHandlers = (teardown: () => Promise<void>, hardKillAfterMs?: number) => {
  const DEFAULT_SHUTDOWN_TIMEOUT_MS = 10 * 1000

  const signals = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
  }

  Object.keys(signals).forEach((signal) => {
    process.on(signal, async () => {
      // biome-ignore lint/suspicious/noConsole: It's OK in here
      console.info(`SERVER: Got ${signal}. Graceful shutdown.`)

      const killTimeoutHandle = setTimeout(() => process.exit(1), hardKillAfterMs ?? DEFAULT_SHUTDOWN_TIMEOUT_MS)

      await teardown()

      clearTimeout(killTimeoutHandle)

      process.exit(0)
    })
  })
}
