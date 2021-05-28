import { CreateComponentFunc } from "createComponent"
import { Router } from "express"

export const __createMiddleware: CreateComponentFunc<In, any> = (
  tag,
  props,
  children
) => {
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

interface In {
  router: Router
}
