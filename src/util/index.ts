import { T } from '../jsxFactory'

export const asArray = <T>(val: T | T[]): T[] => (Array.isArray(val) ? val : [val])

export const isJSXElement = (val: unknown): val is T.Element =>
  typeof val === 'object' && val != null && 'type' in val && 'run' in val && 'props' in val
