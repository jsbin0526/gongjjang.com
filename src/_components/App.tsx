import './Stylesheet.css'
// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import Auth from '../hoc/auth'

function App () {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
        </Switch>
      </Router>
  )
}

export default App
