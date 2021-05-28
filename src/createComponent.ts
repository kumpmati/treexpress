/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateComponentFunc } from './types'
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
