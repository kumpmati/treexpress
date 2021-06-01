import { RequestHandler } from 'express'
import { ServerContext } from '../../index'
import { FC } from '../jsxFactory'
import { asArray } from '../../util'
import { ERRORS } from '../../lib/constants/errors'

/**
 * PATCH request handler
 * @param props
 * @returns
 */
const PATCH: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'PATCH handler',
  run: (ctx) => {
    const parent = ctx.parent ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.patch(props.path ?? '/', ...asArray(props.fn))
  },
  props,
})

export default PATCH

type HandlerProps = {
  fn: RequestHandler | RequestHandler[]
  path?: string
}
