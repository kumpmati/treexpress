import type { CreateComponentFunc } from '../jsxfactory'
import { RequestHandler, Router } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMethod: CreateComponentFunc<Props, In, Out> = (tag, props, children) => {
  const { path, fn, req: reqFn, res: resFn, next: nextFn } = props

  return {
    mount: ({ router }) => {
      router.all(path ?? '/', (req, res, next) => {
        if (req.method.toLowerCase() === tag) {
          if (fn) {
            fn(req, res, next)
          } else {
            reqFn?.(req)
            resFn?.(res)
            nextFn?.(req, res, next)
          }
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
  fn?: RequestHandler
  req?: (req: Express.Request) => void
  res?: (res: Express.Response) => void
  next?: RequestHandler
}

interface In {
  router: Router
}

type Out = void
