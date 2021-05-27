import { Component, createComponent } from "./createComponent"
import type { RequestHandler } from "express"

const JSXPress = createComponent
export default JSXPress

export const start = (root: Component<any, any>) => {
  mount(root, null)
}

const mount = <I, O>(c: Component<I, O>, deps: I) => {
  const result = c.mount(deps)
  for (const child of c.children) {
    mount(child, result)
  }
}

declare namespace JSXPress {
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
type MethodProps = { path?: string; fn: RequestHandler }
