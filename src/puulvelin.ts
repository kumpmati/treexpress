/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CreateComponentFunc } from './jsxfactory'
import type { Router } from 'express'
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

    case 'use':
    case 'middleware':
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

export const start = (root: JSX.Component<null, { router: Router }>): void => {
  mount(root, null)
}

const mount = <I, O>(c: JSX.Component<I, O>, deps: I) => {
  const result = c.mount(deps)
  for (const child of c.children) {
    mount(child, result)
  }
}
