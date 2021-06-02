import { ServerContext } from '../index'
import { FC, T } from 'jsxFactory'

/**
 * Simple wrapper component to run a custom function that receives the context
 * @param props
 * @returns
 */
const Func: FC<FuncProps, ServerContext> = (props) => ({
  type: 'Custom',
  run: (ctx) => props.fn(ctx, props),
  props,
})

export default Func

type FuncProps = {
  fn: (ctx: ServerContext, props: FuncProps) => Promise<unknown> | unknown
  children?: T.Element | T.Element[]
}
