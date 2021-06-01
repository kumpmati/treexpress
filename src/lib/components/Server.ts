import express from 'express'
import { createServer } from 'http'
import T from 'index'
import { FC } from '../jsxFactory'

const Server: FC<ServerProps> = (props) => ({
  type: 'server',
  run: () => {
    const app = express()
    const http = createServer(app)

    // start server after nodes have been iterated through
    setImmediate(() => http.listen(props.port, props.onListen))

    return {
      app,
      http,
      parent: app,
    }
  },
  props,
})

export default Server

type ServerProps = {
  port?: string | number
  children?: T.Element | T.Element[]
  onListen?: () => unknown
}
