import { CreateComponentFunc } from 'createComponent'
import { Router } from 'express'

export const createRouter: CreateComponentFunc<In, Out> = (tag, props, children) => {
  if (!props.path) throw new Error('path is missing')

  return {
    mount: ({ router }) => {
      const r = Router()
      router.use(props.path, r)
      return { router: r }
    },
    props,
    children,
  }
}

interface In {
  router: Router
}
interface Out {
  router: Router
}
