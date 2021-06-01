import { RequestHandler } from 'express'
import { ServerContext } from '../../index'
import { FC } from '../jsxFactory'

/**
 * Handler
 * @param props
 * @returns
 */
const Handler: FC<HandlerProps, ServerContext> = (props) => ({
  type: 'handler',
  run: (ctx) => {
    ctx.parent?.all(props.path ?? '/', (req, res, next) => {
      if (req.method === props.method) {
        props.fn(req, res, next)
        return
      }

      next()
    })
  },
  props,
})

export default Handler

type HandlerProps = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  fn: RequestHandler
  path?: string
}
