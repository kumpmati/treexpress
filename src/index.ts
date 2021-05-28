/* eslint-disable @typescript-eslint/no-namespace */
import { createComponent } from './createComponent'
import type { Router } from 'express'
import { Component } from './types'

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
