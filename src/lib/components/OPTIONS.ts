import { RequestHandler } from 'express'
import { asArray } from '../../util'
import { ServerContext } from '../../index'
import { FC } from '../jsxFactory'
import { ERRORS } from '../../lib/constants/errors'

/**
 * OPTIONS request handler
 * @param props
 * @returns
 */
const OPTIONS: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'handler',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.options(props.path ?? '/', ...asArray(props.fn))
  },
  props,
})

export default OPTIONS

type HandlerProps = {
  fn: RequestHandler | RequestHandler[]
  path?: string
}
