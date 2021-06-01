/* eslint-disable @typescript-eslint/no-namespace */
export namespace T {
  export function createElement(func: FC, props: Props, ...children: Element[]): Element {
    const rendered = func({ children, ...props }) // run the component

    return {
      type: func.name,
      run: rendered.run,
      props,
      children,
    }
  }

  export interface Element<Ctx = unknown> {
    type: string
    run: (ctx: Ctx) => unknown | null
    props: Props
    children?: Element | Element[]
  }

  export namespace JSX {
    export interface ElementChildrenAttribute {
      children: unknown
    }

    export type IntrinsicElements = never
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type FC<T = {}, Ctx = unknown> = (props: PropsWithChildren<T>) => T.Element<Ctx>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsWithChildren<P> = Merge<{ children?: any }, P>
type Merge<A, B> = Omit<A, keyof B> & B
type Props = { [k: string]: unknown }
