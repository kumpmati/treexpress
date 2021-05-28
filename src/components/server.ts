import { CreateComponentFunc } from 'createComponent'
import express from 'express'

export const createServer: CreateComponentFunc<never, Out> = (tag, props, children) => {
  if (!props.port) throw new Error('port not specified')

  return {
    mount: () => {
      const app = express()

      // eslint-disable-next-line no-console
      app.listen(props.port, () => console.log('listening:', props.port))
      return { router: app }
    },
    props,
    children,
  }
}

interface Out {
  router: express.Application
}
