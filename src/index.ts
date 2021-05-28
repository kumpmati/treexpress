/* eslint-disable @typescript-eslint/no-namespace */
import { Component, createComponent } from './createComponent'
import type { RequestHandler, Router } from 'express'
import express from 'express'

export const start = (root: Component<null, { router: Router }>): void => {
  mount(root, null)
}

const mount = <I, O>(c: Component<I, O>, deps: I) => {
  const result = c.mount(deps)
  for (const child of c.children) {
    mount(child, result)
  }
}

const Puu = createComponent
export default Puu

declare namespace Puu {
  namespace JSX {
    export interface IntrinsicElements {
      server: ServerProps
      router: RouteProps
      handler: HandlerProps
      middleware: MiddleWareProps
      use: MiddleWareProps

      get: MethodProps
      post: MethodProps
      put: MethodProps
      delete: MethodProps
    }
  }
}

export type CustomComponent<T = unknown> = <I, O>(props: T) => Component<I, O>

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'

type ServerProps = { port: string | number }
type RouteProps = { path: string }
type HandlerProps = { path?: string; method: HTTPMethod; fn: RequestHandler }
type MiddleWareProps = { path?: string; fn: RequestHandler }
type MethodProps =
  | { path?: string; fn: RequestHandler }
  | { path?: string; req?: ReqFunc; res?: ResFunc; next?: RequestHandler }

type ReqFunc = (req: express.Request) => void
type ResFunc = (res: express.Response) => void
