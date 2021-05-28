import type { CreateComponentFunc } from '../jsxfactory'
import { Router } from 'express'
import type { Server } from 'http'

export const createRouter: CreateComponentFunc<Props, In, Out> = (tag, props, children) => {
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

interface Props {
  path: string
}

interface In {
  router: Router
  server: Server
}
interface Out {
  router: Router
}
