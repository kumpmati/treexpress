import { RequestHandler } from 'express'
import { asArray } from '../../util'
import { ServerContext } from '../../index'
import { FC } from '../jsxFactory'
import { ERRORS } from '../../lib/constants/errors'

/**
 * POST request handler
 * @param props
 * @returns
 */
const POST: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'POST handler',
  run: (ctx) => {
    const parent = ctx.parent ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.post(props.path ?? '/', ...asArray(props.fn))
  },
  props,
})

export default POST

type HandlerProps = {
  fn: RequestHandler | RequestHandler[]
  path?: string
}
