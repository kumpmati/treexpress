import T, { start } from './index'
import Server from './lib/components/Server'
import GET from './lib/components/GET'
import Router from './lib/components/Router'
import POST from 'lib/components/POST'

start(
  <Server port={8000}>
    <Router>
      <GET fn={(_, res) => res.json({ hello: 'world!' })} />
      <POST fn={(_, res) => res.json({ hello: 'again' })} />
    </Router>
  </Server>,
)
