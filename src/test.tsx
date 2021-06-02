import T, { start } from './index'
import Server from './lib/components/Server'
import GET from './lib/components/GET'
import Router from './lib/components/Router'

const CustomComponent = () => {
  return (
    <Router path="/custom">
      <GET fn={(_, res) => res.json({ hello: 'from the inside' })} />
    </Router>
  )
}

start(
  <Server port={8000}>
    <Router path="/inside">
      <CustomComponent />
      <Router path="/insider">
        <GET fn={(_, res) => res.json({ hello: 'from the insider' })} />
      </Router>
    </Router>
  </Server>,
)
