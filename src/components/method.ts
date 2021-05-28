import type { CreateComponentFunc } from '../types'
import { Router } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMethod: CreateComponentFunc<In> = (tag, props, children) => {
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

interface In {
  router: Router
}
