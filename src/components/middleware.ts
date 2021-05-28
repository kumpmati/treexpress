import type { CreateComponentFunc } from '../jsxfactory'
import { RequestHandler, Router } from 'express'
import { Server } from 'http'

export const createMiddleware: CreateComponentFunc<Props, In, Out> = (tag, props, children) => {
  const { path, fn } = props

  return {
    mount: ({ router }) => {
      if (path) {
        router.use(path, fn)
      } else {
        router.use(fn)
      }
    },
    props,
    children,
  }
}

interface Props {
  path?: string
  fn: RequestHandler
}

interface In {
  router: Router
  server: Server
}

type Out = void
