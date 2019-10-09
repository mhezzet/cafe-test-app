import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
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
          <Route path='/create' exact component={Form} />
          <Route path='/update/:id' exact component={Form} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
