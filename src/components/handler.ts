import type { CreateComponentFunc } from '../types'
import { Router } from 'express'

export const createHandler: CreateComponentFunc<In> = (tag, props, children) => {
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

interface In {
  router: Router
}
