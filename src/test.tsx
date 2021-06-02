import T, { start } from './lib/index'
import Server from './lib/components/Server'
import GET from './lib/components/GET'
import Router from './lib/components/Router'
import { FC } from './lib/jsxFactory'

const Api: FC<{ path: string }> = ({ path, children }) => {
  return (
    <Router path={path}>
      <GET fn={(_, res) => res.json({ hello: 'from API' })} />
      {children}
    </Router>
  )
}

const B: FC<{ path: string }> = ({ path, children }) => {
  return (
    <Router path={path}>
      <GET fn={(_, res) => res.json({ hello: 'from B' })} />
      {children}
    </Router>
  )
}

start(
  <Server port={8000}>
    <GET fn={(_, res) => res.json({ hello: 'from root' })} />
    <Api path="/api">
      <Router path="/inner">
        <GET fn={(_, res) => res.json({ hello: 'from API/inner' })} />
      </Router>
      <B path="/b">
        <GET path="/haha" fn={(_, res) => res.json({ hello: 'from B/haha' })} />
      </B>
    </Api>
  </Server>,
)
