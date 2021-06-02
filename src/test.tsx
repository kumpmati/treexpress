import T, { start } from './index'
import Server from './components/Server'
import GET from './components/GET'
import Router from './components/Router'
import { FC } from './jsxFactory'

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
