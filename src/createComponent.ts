import { __createHandler } from "./components/handler"
import { __createMethod } from "./components/method"
import { __createMiddleware } from "./components/middleware"
import { __createRouter } from "./components/router"
import { __createServer } from "./components/server"

export const createComponent: CreateComponentFunc = (
  tag,
  props,
  ...children
) => {
  if (typeof tag === "function") {
    return tag(props)
  }

  switch (tag) {
    case "server":
      return __createServer(tag, props, children)

    case "router":
      return __createRouter(tag, props, children)

    case "middleware":
      return __createMiddleware(tag, props, children)

    case "handler":
      return __createHandler(tag, props, children)

    case "get":
    case "post":
    case "put":
    case "delete":
      return __createMethod(tag, props, children)

    default:
      throw new Error("invalid tag")
  }
}

export type CreateComponentFunc<
  I extends Record<string, any> = any,
  O extends Record<string, any> = any
> = (tag: string | Function, props: any, children: any[]) => Component<I, O>

export type Component<In, Out> = {
  mount: (deps: In) => Out
  unmount?: () => any
  props: any
  context?: any
  children: Component<Out, any>[]
}
