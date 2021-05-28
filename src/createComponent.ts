/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHandler } from './components/handler'
import { createMethod } from './components/method'
import { createMiddleware } from './components/middleware'
import { createRouter } from './components/router'
import { createServer } from './components/server'

export const createComponent: CreateComponentFunc = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    return tag(props)
  }

  switch (tag) {
    case 'server':
      return createServer(tag, props, children)

    case 'router':
      return createRouter(tag, props, children)

    case 'middleware':
    case 'use':
      return createMiddleware(tag, props, children)

    case 'handler':
      return createHandler(tag, props, children)

    case 'get':
    case 'post':
    case 'put':
    case 'delete':
      return createMethod(tag, props, children)

    default:
      throw new Error('invalid tag')
  }
}

export type CreateComponentFunc<
  I extends Record<string, any> | void = any,
  O extends Record<string, any> | void = any,
> = (tag: string | ((props: any) => any), props: any, children: any[]) => Component<I, O>

export type Component<In, Out> = {
  mount: (deps: In) => Out
  unmount?: () => any
  props: any
  context?: any
  children: Component<Out, any>[]
}
