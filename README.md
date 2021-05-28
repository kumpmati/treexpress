# Puulvelin

Write express.js servers in JSX format.

Puulvelin is a small library that allows you to write the most basic parts of an express server using custom JSX tags. It supports simple custom components along with the built-in tags. It is not reactive, meaning the components are run only once at the start of the server. It is written in typescript and the typescript compiler is used to transpile the JSX.

The name is a combination of the Finnish words puu ('tree') and palvelin ('server').

## Example

Example of a simple Puulvelin server:

```jsx
// index.tsx
import Puu, { start } from "puulvelin"

start(
  <server port={80}>
    <router path="/api">
      <middleware
        fn={(req, res, next) => {
          console.log(req.method, req.path)
          next()
        }}
      />

      <get fn={(req, res) => res.status(200).json({ foo: "bar" })} />
    </router>
  </server>
)
```

The example code has a single GET request handler at `http://localhost:80/api/books`, and a logger middleware in the `/api` router that prints the request method and path

Example of a custom component:

```jsx
// myComponent.tsx
import Puu from "puulvelin"

export const Api = ({ path }: { path: string }) => {
  return (
    <router path={path}>
      <middleware
        fn={(req, res, next) => {
          console.log(req.method, req.path)
          next()
        }}
      />
      <get fn={(req, res) => res.status(200).json({ hello: "world" })} />
    </router>
  )
}
```

```jsx
// index.tsx
import Puu, { start } from "puulvelin"
import { Api } from "./myComponent"

start(
  <server port={80}>
    <Api path="/api" />
  </server>
)
```

## Custom JSX tags:

### `server`

The main express App that all routers and handlers are attached to

Props:

#### `port`: number | string

The port that the server runs on

### `router`

An express.js Router instance, you can attach request handlers and other routers to it

Props:

#### `path`: string

When attaching the router to its parent, it will be attached at this path relative to the parent.

### `handler`

A generic request handler. You can define which request methods it accepts, and a handler function that handles the requests. Optionally you can also define the path of the handler relative to its parent.

Props:

#### `path`?: string

Path to attach the handler to. Relative to its parent router. If unspecified, the path is `/`.

#### `method`: "GET" | "POST" | "PUT" | "DELETE"

The accepted request method for this handler. Currently supports only one method at a time

#### `fn`: (req, res, next) => any

A normal express.js request handler function. This function is called every time a request to its path is received.

### `middleware`

Allows you to attach express.js middleware to a router. Optionally you can also define the relative path of the middleware.

Props:

#### `path`?: string

Path to attach the middleware to. Relative to its parent router. If unspecified, the path is `/`.

#### `fn`: (req, res, next) => any

Any normal express.js middleware function.

### `get`

### `post`

### `put`

### `delete`

Each of these is a single JSX tag, which accepts a handler function and optionally a path. It is the same concept as the `handler` tag, but instead uses the accepted request method as the tag name.

Props:

#### `path`?: string

Path to attach the handler to. Relative to its parent router. If unspecified, the path is `/`.

#### `fn`: (req, res, next) => any

Normal express.js request handler. This function is called every time a request with the same method as the tag name is received at the given path.

Example:

```jsx
<get
  path="/:name"
  fn={(req, res) =>
    res.status(200).json({ message: `hello ${req.params.name}` })
  }
/>
```
