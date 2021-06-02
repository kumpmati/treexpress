import express from 'express'
import { createServer } from 'http'
import T, { ServerContext } from '../index'
import { FC } from '../jsxFactory'

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

    await props.init?.(ctx)

    setImmediate(() => http.listen(props.port, () => props.onListen?.(ctx)))

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
