import { RequestHandler } from 'express'
import { asArray } from '../../util'
import { ServerContext } from '../../index'
import { FC } from '../jsxFactory'
import { ERRORS } from '../../lib/constants/errors'

/**
 * DELETE request handler
 * @param props
 * @returns
 */
const DELETE: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'DELETE handler',
  run: (ctx) => {
    const parent = ctx.parent ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.delete(props.path ?? '/', ...asArray(props.fn))
  },
  props,
})

export default DELETE

type HandlerProps = {
  fn: RequestHandler | RequestHandler[]
  path?: string
}
