import express from 'express'
import { createServer } from 'http'
import { ServerContext } from '../index'
import { FC, T } from '../jsxFactory'

/**
 * Main server component. Starts an express.js server, and passes the server down to its children
 * @param props
 * @returns
 */
const Server: FC<ServerProps> = (props) => ({
  type: 'Server JSX element',
  run: async () => {
    await props.beforeInit?.()

    const app = express()
    const http = createServer(app)

    // apply user settings
    for (const [key, value] of Object.entries(props.settings || {})) {
      app.set(key, value)
    }

    const ctx = {
      app,
      http,
    }

    // additional logic before server is started
    await props.init?.(ctx)

    const port = props.port ?? process.env.PORT
    // eslint-disable-next-line no-console
    if (!port) console.warn('WARN: no port defined for server')

    setImmediate(() => http.listen(port, () => props.onListen?.(ctx)))

    return ctx
  },
  props,
})

export default Server

type ServerProps = {
  port?: string | number
  children?: T.Element<ServerContext> | T.Element<ServerContext>[]
  beforeInit?: () => Promise<unknown> | unknown
  init?: (ctx: ServerContext) => Promise<unknown> | unknown
  onListen?: (ctx: ServerContext) => Promise<unknown> | unknown
  settings?: { [k: string]: unknown }
}
