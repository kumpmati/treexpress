/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Router } from 'express'
import type { CreateComponentFunc } from './jsxfactory'
import { createHandler } from './components/handler'
import { createMethod } from './components/method'
import { createMiddleware } from './components/middleware'
import { createRouter } from './components/router'
import { createServer } from './components/server'
import { createDependency } from './components/dependency'

export const createComponent: CreateComponentFunc<any, any, any> = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    return tag(props)
  }

  switch (tag) {
    case 'server':
      return createServer(tag, props, children as any)

    case 'router':
      return createRouter(tag, props, children as any)

    case 'use':
    case 'middleware':
      return createMiddleware(tag, props, children as any)

    case 'handler':
      return createHandler(tag, props, children as any)

    case 'get':
    case 'post':
    case 'put':
    case 'delete':
      return createMethod(tag, props, children as any)

    case 'dependency':
      return createDependency(tag, props, children as any)

    default:
      throw new Error('invalid tag')
  }
}

export const start = (root: JSX.Component<null, { router: Router }>): void => {
  mount(root, null)
}

const mount = <I, O>(c: JSX.Component<I, O>, deps: I) => {
  const result = c.mount(deps)

  for (const child of c.children || []) {
    mount(child, result)
  }
}
