import express from 'express'
import { Server } from 'http'
import { T } from './jsxFactory'
export default T

/**
 * Starts evaluating the node tree.
 * Works by recursively calling the `.run()`-method of every node and their children
 * @param root
 * @param ctx
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const start = <Ctx = any>(root: T.Element, ctx?: Ctx): void => {
  evalNode(root, ctx ?? {})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const evalNode = async (node: T.Element, ctx: any) => {
  if (Array.isArray(node)) {
    for await (const item of node) {
      evalNode(item, ctx)
    }
    return
  }

  const newCtx = (await node.run?.(ctx)) ?? ctx

  if (Array.isArray(node.props?.children)) {
    for (const child of node.props.children) {
      await evalNode(child, { ...ctx, ...newCtx }) // merge parent context with new context
    }
  }
}

export type ServerContext = {
  app: express.Application
  http: Server
  router?: express.Router
}
