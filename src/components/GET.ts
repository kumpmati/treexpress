import { RequestHandler } from 'express'
import { asArray } from '../util'
import { ServerContext } from '../index'
import { FC } from '../jsxFactory'
import { ERRORS } from '../constants/errors'

/**
 * GET request handler
 * @param props
 * @returns
 */
const GET: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'GET handler JSX element',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.get(props.path ?? '/', ...asArray(props.fn))
  },
  props,
})

export default GET

type HandlerProps = {
  fn: RequestHandler | RequestHandler[]
  path?: string
}
