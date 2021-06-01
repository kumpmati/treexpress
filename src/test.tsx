import T, { start } from './index'
import Server from './lib/components/Server'
import GET from './lib/components/GET'
import Router from './lib/components/Router'

const CustomComponent = () => {
  return <Router path="/b"></Router>
}

console.log(void (<Router path="/a" />), void (<CustomComponent />))
