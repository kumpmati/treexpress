import { RequestParamHandler } from 'express'
import { ServerContext } from '../../index'
import { FC } from '../jsxFactory'
import { ERRORS } from '../../lib/constants/errors'

/**
 * GET request handler
 * @param props
 * @returns
 */
const Param: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'Param',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app
    parent.param(props.param, props.fn)
  },
  props,
})

export default Param

type HandlerProps = {
  param: string
  fn: RequestParamHandler
}
