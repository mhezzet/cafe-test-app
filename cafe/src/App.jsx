import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Form from './pages/Form'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/create' exact component={Form} />
        <Route path='/update/:id' exact component={Form} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
