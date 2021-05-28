/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { RequestHandler } from 'express'

declare global {
  namespace JSX {
    type Component<In, Out> = {
      mount: (deps: In) => Out
      unmount?: () => any
      props: any
      context?: any
      children: Component<Out, any>[]
    }

    export interface IntrinsicElements {
      server: ServerProps
      router: RouteProps
      handler: HandlerProps
      middleware: MiddleWareProps
      use: MiddleWareProps
      dependency: DependencyProps

      get: MethodProps
      post: MethodProps
      put: MethodProps
      delete: MethodProps
    }
  }
}

export type CreateComponentFunc<P extends Record<string, any>, I, O> = (
  tag: string | ((props: P) => JSX.Component<I, O>),
  props: P,
  children: JSX.Component<O, any>[],
) => JSX.Component<I, O>

export type FC<T = unknown> = <I, O>(props: T) => JSX.Component<I, O>

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'

type ServerProps = { port: string | number }
type RouteProps = { path: string }
type HandlerProps = { path?: string; method: HTTPMethod; fn: RequestHandler }
type MiddleWareProps = { path?: string; fn: RequestHandler }
type DependencyProps = { fn: (deps: any) => any }
type MethodProps =
  | { path?: string; fn: RequestHandler }
  | { path?: string; req?: ReqFunc; res?: ResFunc; next?: RequestHandler }

type ReqFunc = (req: express.Request) => void
type ResFunc = (res: express.Response) => void
