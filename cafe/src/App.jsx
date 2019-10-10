import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import Landing from './pages/Landing'
import Form from './pages/Form'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import history from './history'

function App() {
  return (
    <>
      <Header />
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/404' exact component={NotFound} />
          <Route path='/:type' exact component={Form} />
          <Route path='/:type/:id' exact component={Form} />
        </Switch>
      </Router>
    </>
  )
}

export default App
