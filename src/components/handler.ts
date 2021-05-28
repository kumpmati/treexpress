import { RequestHandler, Router } from 'express'
import type { CreateComponentFunc, HTTPMethod } from '../jsxfactory'

export const createHandler: CreateComponentFunc<Props, In, Out> = (tag, props, children) => {
  const { path, method, fn } = props

  return {
    mount: ({ router }) => {
      router.all(path ?? '/', (req, res, next) => {
        if (req.method === method) {
          fn(req, res, next)
          return
        }

        next()
      })
    },
    props,
    children,
  }
}

interface Props {
  path?: string
  method: HTTPMethod
  fn: RequestHandler
}

interface In {
  router: Router
}

type Out = void
