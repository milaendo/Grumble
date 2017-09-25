import React, { Component } from 'react'

// router
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {AuthRoute} from '../lib/auth'

// connecting react and redux
import {Provider} from 'react-redux'
import store from '../store'

// layout
import Layout from './Layout'

// page components
import Home from './Home'
import Registration from './Registration'
import GrumbForm from './GrumbForm'
import Login from './Login'

// base styles and icons
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'

// custom styles
import '../styles/App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/registration" component={Registration} />
              <Route path="/grumb" component={GrumbForm} />
              <Route path="/login" component={Login} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    )
  }
}

export default App
