import { RequestHandler } from 'express'
import { asArray } from '../../util'
import { ServerContext } from '../index'
import { FC } from '../jsxFactory'
import { ERRORS } from '../../lib/constants/errors'

/**
 * PUT request handler
 * @param props
 * @returns
 */
const PUT: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'PUT handler JSX element',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.put(props.path ?? '/', ...asArray(props.fn))
  },
  props,
})

export default PUT

type HandlerProps = {
  fn: RequestHandler | RequestHandler[]
  path?: string
}
