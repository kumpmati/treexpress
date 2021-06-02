import T, { start } from './lib/index'
import Server from './lib/components/Server'
import GET from './lib/components/GET'

start(
  <Server port={8000}>
    <GET fn={(_, res) => res.json({ hello: 'from root' })} />
  </Server>,
)
