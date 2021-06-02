import { RequestHandler } from 'express'
import { ServerContext } from 'lib/index'
import { asArray } from '../../util'
import { ERRORS } from '../../lib/constants/errors'
import { FC } from '../../lib/jsxFactory'

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
