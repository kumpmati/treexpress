import { CreateComponentFunc } from "createComponent"
import { Router } from "express"

export const __createMethod: CreateComponentFunc<In, any> = (
  tag,
  props,
  children
) => {
  const { path, fn, req: reqFn, res: resFn, next: nextFn } = props

  return {
    mount: ({ router }) => {
      router.all(path ?? "/", (req, res, next) => {
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
