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
export const start = (root: T.Element, ctx: { [k: string]: unknown } = {}): void => {
  evalNode(root, ctx)
}

const evalNode = (node: T.Element, ctx: unknown) => {
  const newCtx = node.run(ctx) ?? ctx // keep parent context if node returns nothing

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      evalNode(child, newCtx)
    }
  }
}

export type ServerContext = {
  app: express.Application
  http: Server
  router?: express.Router
}
