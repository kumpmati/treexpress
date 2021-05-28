import { Router } from 'express'
import type { CreateComponentFunc } from '../jsxfactory'

export const createDependency: CreateComponentFunc<Props, In, Out> = (tag, props, children) => {
  const { fn } = props

  if (!fn) throw new Error('no function specified')

  return {
    mount: (deps) => {
      return fn(deps)
    },
    props,
    children,
  }
}

interface Props {
  fn: (deps: In) => Out
}

interface In {
  router: Router
}

type Out = In | Record<string, unknown>
