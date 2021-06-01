import express from 'express'
import { ServerContext } from '../../index'
import { FC, T } from '../jsxFactory'

/**
 * Express.js Router
 * @param props
 * @returns
 */
const Router: FC<RouterProps, ServerContext> = (props) => ({
  type: 'router',
  run: (ctx) => {
    const parent = ctx.router ?? ctx.app // use parent router if available, otherwise use server

    const r = express.Router()
    parent.use(props.path ?? '/', r)

    return {
      router: r, // pass r as the router for children
    }
  },
  props,
})
export default Router

type RouterProps = {
  path?: string
  children?: T.Element | T.Element[]
}
