import { CreateComponentFunc } from "createComponent"
import { Router } from "express"

export const __createHandler: CreateComponentFunc<In> = (
  tag,
  props,
  children
) => {
  const { path, method, fn } = props

  return {
    mount: ({ router }) => {
      router.all(path ?? "/", (req, res, next) => {
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