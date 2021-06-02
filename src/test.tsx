import T, { FC, GET, Router, Server, start } from './index'

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
