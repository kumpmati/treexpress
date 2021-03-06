import { RequestParamHandler } from 'express'
import { ServerContext } from '../index'
import { FC } from '../jsxFactory'
import { ERRORS } from '../constants/errors'

/**
 * GET request handler
 * @param props
 * @returns
 */
const Param: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'Param JSX element',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    parent.param(props.param, props.fn)
  },
  props,
})

export default Param

type HandlerProps = {
  param: string
  fn: RequestParamHandler
}
