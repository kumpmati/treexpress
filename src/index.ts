import { Component, createComponent } from "./createComponent"
import type { RequestHandler, Router } from "express"
import express from "express"

const Juice = createComponent
export default Juice

export const start = (root: Component<any, { router: Router }>) => {
  mount(root, null)
}

const mount = <I, O>(c: Component<I, O>, deps: I) => {
  const result = c.mount(deps)
  for (const child of c.children) {
    mount(child, result)
  }
}

declare namespace Juice {
  namespace JSX {
    export interface IntrinsicElements {
      server: ServerProps
      router: RouteProps
      handler: HandlerProps
      middleware: MiddleWareProps

      get: MethodProps
      post: MethodProps
      put: MethodProps
      delete: MethodProps
    }
  }
}

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"

type ServerProps = { port: string | number }
type RouteProps = { path: string }
type HandlerProps = { path?: string; method: HTTPMethod; fn: RequestHandler }
type MiddleWareProps = { path?: string; fn: RequestHandler }
type MethodProps =
  | { path?: string; fn: RequestHandler }
  | { path?: string; req?: ReqFunc; res?: ResFunc; next?: RequestHandler }

type ReqFunc = (req: express.Request) => any
type ResFunc = (res: express.Response) => any
