import { RequestHandler } from 'express'
import { ServerContext } from '../index'
import { asArray } from '../util'
import { ERRORS } from '../constants/errors'
import { FC } from '../jsxFactory'

/**
 * Attaches middleware to its parent router (or server if no parent router is found)
 * @param props
 * @returns
 */
const Use: FC<UseProps, ServerContext> = (props) => ({
  type: 'Use JSX element',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.use(props.path ?? '/', ...asArray(props.fn))
  },
  props,
})

export default Use

type UseProps = {
  fn: RequestHandler | RequestHandler[]
  path?: string
}
