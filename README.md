# Puulvelin 🌲

Write express.js servers in JSX format.

**Note:** This project is highly experimental and very buggy! No not use it in production

Puulvelin is a teeny tiny library built around express.js that allows you to write the basic parts of an express.js server using JSX tags. It supports simple function components along with the built-in tags. Puulvelin is **not** reactive, meaning the components are run only once at the start of the server, and will not react to changes in their props or contents.

The name is a combination of the Finnish words puu ('tree') and palvelin ('server').

## Setup

Install the package with npm: `npm install puulvelin`.

You must have typescript installed to use `puulvelin`. Install it with npm: `npm install --save-dev typescript`

Your `tsconfig.json` should include the following options:

```js
{
  "compilerOptions": {
    // ...

    "esModuleInterop": true,
    "moduleResolution": "node",
    "jsx": "react",
    "jsxFactory": "Puu"
  },
  // ...
}
```

## Examples

**Example of a simple Puulvelin server:**

```jsx
// index.tsx
import Puu, { start } from 'puulvelin'

start(
  <server port={80}>
    <router path="/api">
      <use
        fn={(req, res, next) => {
          console.log(req.method, req.path)
          next()
        }}
      />

      <get fn={(req, res) => res.status(200).json({ foo: 'bar' })} />
    </router>
  </server>,
)
```

The example code has a single GET request handler at `http://localhost:80/api`, and a logger middleware in the `/api` router that prints the request method and path

**Same example using custom components:**

```jsx
// myComponent.tsx
import Puu, { FC } from 'puulvelin'

export const Api: FC<{ path: string }> = ({ path }) => {
  return (
    <router path={path}>
      <use
        fn={(req, res, next) => {
          console.log(req.method, req.path)
          next()
        }}
      />
      <get fn={(req, res) => res.status(200).json({ hello: 'world' })} />
    </router>
  )
}
```

```jsx
// index.tsx
import Puu, { start } from 'puulvelin'
import { Api } from './myComponent'

start(
  <server port={80}>
    <Api path="/api" />
  </server>,
)
```

You can probably see the resemblance to React, with the props and returning JSX and such. Just keep in mind that this is _not_ React!

## Reference

### Server

The main express App that all routers and handlers are attached to. Every router and handler must be inside the server tag to work.

Tag: `server`

Props:

- `port`: number | string

  The port that the server runs on

### Routers

Standard express.js Router. You can nest these as deep as you want, and attach request handlers and middleware to it.

Tag: `router`

Props:

- `path`: string

  The router will be attached to this path, appending the path to the router's parent's path.

### Request handlers

Standard express.js request handler. You can define which request method it accepts, and a handler function that handles the requests. Optionally you can also define a path for the request handler.

Tag: `handler`

Props:

- `path`?: string

  Path to attach the handler to. Relative to its parent router. If unspecified, the path is `/`.

- `method`: "GET" | "POST" | "PUT" | "DELETE"

  The accepted request method for this handler. Currently supports only one method at a time

- `fn`: (req, res, next) => any

  An express.js request handler function. This function is called every time a request to the handler's path is received.

### Method-specifig request handlers

Alternatively to the `handler` tag, you can use the HTTP method name (in lowercase) as the tag name. It works the same way as the `handler` tag, as in you can define an optional path and a handler function.

Tags: `get`, `post`, `put`, `delete`

Props:

- `path`?: string

  Path to attach the handler to. Relative to its parent router. If unspecified, the path is `/`.

- `fn`: (req, res, next) => any

  Normal express.js request handler. This function is called every time a request with the same method as the tag name is received at the given path.

### Middleware

Allows you to attach an express.js middleware function to a router (or the server). Optionally you can also define a path for the middleware.

Tags: `use`, `middleware`

Props:

- `path`?: string

  Path to attach the middleware to. Relative to its parent router. If unspecified, the path is `/`.

- `fn`: (req, res, next) => any

  Any normal express.js middleware function.
