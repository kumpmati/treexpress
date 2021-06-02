# Treexpress 🌲

**Super-mega-hyper experimental project! Use at your own risk, the API will likely change with future releases!**

Treexpress is a teeny tiny library built around express.js that allows you to write the basic parts of an express.js server using JSX components.

Since this is mostly just a wrapper around express, it is **highly** recommended to learn express first, as Treexpress tries to preserve most of the core principles of express.

[Express v4 documentation](http://expressjs.com/en/4x/api.html)

Treexpress supports functional components only. Treexpress is **not** reactive, meaning the components are run only once at the start, and will not react to changes in their props or children.

## Setup

Install the package with npm: `npm install treexpress`.

In addition to `treexpress`, you'll need to install the following packages:

- TypeScript: `npm install --save-dev typescript`
- Express.js: `npm install express` (if you want to utilise express features that are not present in Treexpress)

Your `tsconfig.json` should include the following options:

```js
{
  "compilerOptions": {
    // ...

    "esModuleInterop": true,
    "moduleResolution": "node",
    "jsx": "react",
    "jsxFactory": "T",
  },
  // ...
}
```

## Examples

**Example of a simple Treexpress server:**

```jsx
// index.tsx
import T, { start, Server, Router, Use, GET } from 'treexpress'

start(
  <Server port={8000}>
    <Router path="/api">
      <Use
        fn={(req, res, next) => {
          console.log(req.method, req.path)
          next()
        }}
      />
      <GET fn={(_, res) => res.send('hello').end()} />
    </Router>
  </Server>,
)
```

The example code has a single GET request handler at `http://localhost:8000/api`, and a logger middleware that prints the request method and path on every request to `http://localhost:8000/api`.

**Same example using custom components:**

```jsx
// myComponent.tsx
import T, { Router, Use, GET, FC } from 'treexpress'

const MyComponent: FC = () => {
  return (
    <Router path="/api">
      <Use
        fn={(req, res, next) => {
          console.log(req.method, req.path)
          next()
        }}
      />
      <GET fn={(_, res) => res.send('hello').end()} />
    </Router>
  )
}

export default MyComponent
```

```jsx
// index.tsx
import T, { start, Server } from 'treexpress'
import MyComponent from './myComponent'

start(
  <Server port={8000}>
    <MyComponent />
  </Server>,
)
```

You can probably see the resemblance to React, with the props and returning JSX and such. Just keep in mind that this is **not** React! Each component is only run **once**!

## Reference

### Running the server

To start the server we use a simple function that evaluates the node tree given to it. Its intended use is to pass the `<Server ...>...</Server>` inside it, and in turn it will start the server.

```ts
start<T>(root: T.element, ctx?: T) => void
```

Arguments:

- `root: T.element`

  The node to start evaluating. It will first evaluate the root element, then recursively evaluate each of its child nodes.

- `ctx?: any`

  Optional context to give to the Server component. currently does nothing.

### Server

Wrapper component around the `express()` server. Should be the root component of the `start()`-function. All routers and handlers must be defined inside the Server

Component: `Server`

Props:

- `port: number | string`

  The port that the server runs on

- `settings?: { [k: string]: unknown }`

  Optional settings object to pass settings to the underlying express app. Each key is a setting name and the value is the desired setting value. It uses the express.js `app.set()` function internally. [Relevant Express documentation](http://expressjs.com/en/5x/api.html#app.set)

- `beforeInit?: () => Promise<unknown> | unknown`

  Optional sync/async function to run before the express server is initialized. If the function is async, the component will await the function before creating the express server.

- `init?: (ctx: ServerContext) => Promise<unknown> | unknown`

  Optional sync/async function to run after the express server has been created but is not listening yet. If the function is async, the component will await the function before continuing.

- `onListen?: (ctx: ServerContext) => Promise<unknown> | unknown`

  Optional sync/async function to run after the server has started listening.

### Router

Wrapper component around `express.Router()`. Any child routers, handlers and middleware are attached to this router. You can nest these just like in a normal express app.

Component: `Router`

Props:

- `path`: string

  Mount path.

### Request handlers

Wrapper components around the express.js route handlers. Uses the express `router.METHOD(path, [callback, ...] callback)` function (where METHOD is replaced by the HTTP method in **lowercase**). This can be a child element of a `Server` or `Router` component, but not another request handler or middleware component.

Currently supported methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`

Props:

- `path?: string`

  Optional mount path. Relative to its parent element. Default value is `/`

- `fn: RequestHandler | RequestHandler[]`

  An express request handler function, or an array of functions. These are called when a request to the handler's path is received. If `fn` is an array, the functions are registered sequentially. [Relevant Express documentation](http://expressjs.com/en/5x/api.html#router.METHOD)

### Middleware

Allows you to attach an express.js middleware function to a router (or the server). Optionally you can also define a path for the middleware.

Component: `Use`

Props:

- `path`?: string

  Path to attach the middleware to. Relative to its parent router. Default value is `/`.

- `fn: RequestHandler | RequestHandler[]`

  Any normal express.js middleware function, or array of functions. These are called on every request to the specified path. If `fn` is an array, the functions are registered sequentially.
