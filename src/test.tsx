import T, { start } from './lib/index'
import Server from './lib/components/Server'
import GET from './lib/components/GET'
import Router from './lib/components/Router'
import { FC } from './lib/jsxFactory'

const Api: FC<{ path: string }> = ({ path }) => {
  return (
    <Router path={path}>
      <GET fn={(_, res) => res.send('hello from API').end()} />
    </Router>
  )
}

start(
  <Server port={8000}>
    <GET fn={(_, res) => res.send('hello from root').end()} />
    <Api path="/api" />
  </Server>,
)
