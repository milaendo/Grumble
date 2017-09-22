import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGrumbs } from '../actions/action'

class MyComponent extends Component {
  componentWillMount() {
    getGrumbs()
  }

  render() {
    return (
      <div className="container">
        <h1>Grumble :-|</h1>
      </div>
    )
  }
}

const stateToProps = function(appState) {
  return {
    grumb: appState.app.grumbs // ".app" because we ran combineReducers
  }
}

export default connect(stateToProps)(MyComponent)