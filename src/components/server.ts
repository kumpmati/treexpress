import { CreateComponentFunc } from "createComponent"
import express from "express"

export const __createServer: CreateComponentFunc<{}, Out> = (
  tag,
  props,
  children
) => {
  if (!props.port) throw new Error("port not specified")

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

interface Out {
  router: express.Application
}
