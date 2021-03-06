import express from 'express'
import { ERRORS } from '../constants/errors'
import { ServerContext } from '../index'
import { FC } from '../jsxFactory'

/**
 * Express.js Router
 * @param props
 * @returns
 */
const Router: FC<RouterProps, ServerContext> = (props) => ({
  type: 'Router JSX element',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app
    if (!parent) throw ERRORS.OUTSIDE_SERVER

    const r = express.Router()
    parent.use(props.path, r)

    return {
      router: r,
    }
  },
  props,
})
export default Router

type RouterProps = {
  path: string
}
