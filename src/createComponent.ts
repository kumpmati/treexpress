import express from "express"

export const createComponent = (
  tag: string | Function,
  props: any,
  ...children: any[]
): Component<any, any> => {
  if (typeof tag === "function") {
    return tag(props)
  }

  switch (tag) {
    case "server": {
      return {
        mount: () => {
          const app = express()

          app.listen(props.port, () => console.log("listening:", props.port))
          return { router: app }
        },
        props,
        children,
      }
    }

    case "router": {
      return {
        mount: (deps) => {
          const r = express.Router()
          deps.router.use(props.path, r)
          return { router: r }
        },
        props,
        children,
      }
    }

    case "middleware": {
      return {
        mount: (deps) => {
          const r = deps.router as express.Router
          if (props.path) {
            r.use(props.path, props.handler)
          } else {
            r.use(props.handler)
          }
        },
        props,
        children,
      }
    }

    case "handler": {
      return {
        mount: (deps) => {
          const r = deps.router as express.Router
          r.all(props.path ?? "/", (req, res, next) => {
            if (req.method == props.method) {
              props.handler(req, res, next)
              return
            }
            next()
          })
        },
        props,
        children,
      }
    }

    case "get":
    case "post":
    case "put":
    case "delete": {
      return {
        mount: (deps) => {
          const r = deps.router as express.Router
          r.all(props.path ?? "/", (req, res, next) => {
            if (req.method.toLowerCase() == tag) {
              props.handler(req, res, next)
              return
            }
            next()
          })
        },
        props,
        children,
      }
    }

    default: {
      throw new Error("invalid tag")
    }
  }
}

export type Component<In, Out> = {
  mount: (deps: In) => Out
  unmount?: () => any
  props: any
  context?: any
  children: Component<Out, any>[]
}
