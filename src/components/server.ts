import type { CreateComponentFunc } from '../jsxfactory'
import express, { Router } from 'express'
import http from 'http'

export const createServer: CreateComponentFunc<Props, null, Out> = (tag, props, children) => {
  if (!props.port) throw new Error('port not specified')

  return {
    mount: () => {
      const app = express()

      const router = Router()
      app.use(router)

      const server = http.createServer(app)

      // eslint-disable-next-line no-console
      server.listen(props.port, () => console.log('listening:', props.port))
      return { app, server, router }
    },
    props,
    children,
  }
}

interface Props {
  port: number | string
}

interface Out {
  app: express.Application
  server: http.Server
  router: Router
}
