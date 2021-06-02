import express from 'express'
import { createServer } from 'http'
import T, { ServerContext } from '../index'
import { FC } from '../jsxFactory'

const Server: FC<ServerProps> = (props) => ({
  type: 'Server JSX element',
  run: () => {
    const app = express()
    const http = createServer(app)

    const ctx = {
      app,
      http,
    }

    setImmediate(() => http.listen(props.port, () => props.onListen?.(ctx)))

    return ctx
  },
  props,
})

export default Server

type ServerProps = {
  port?: string | number
  children?: T.Element<ServerContext> | T.Element<ServerContext>[]
  onListen?: (ctx: ServerContext) => unknown
}
