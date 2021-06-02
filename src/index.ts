import express from 'express'
import { Server } from 'http'
import { T } from './lib/jsxFactory'
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
const evalNode = (node: T.Element, ctx: any) => {
  const newCtx = node.run(ctx) ?? ctx

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      evalNode(child, { ...ctx, ...newCtx }) // merge parent context with new context
    }
  }
}

export type ServerContext = {
  app: express.Application
  http: Server
  router?: express.Router
}
