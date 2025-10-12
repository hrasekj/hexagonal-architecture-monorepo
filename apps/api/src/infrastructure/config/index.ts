export const parseApiConfig = (env: any) => {
  const config = {
    port: parseInt(env.PORT ?? '8080', 10),
    host: env.HOST ?? 'localhost',
  }

  return config
}
