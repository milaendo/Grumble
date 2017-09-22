import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGrumbs } from '../actions/action'
import GrumbleList from './GrumbleList'

class MyComponent extends Component {
  componentWillMount() {
    getGrumbs()
  }

  render() {
    return (
      <div className="container">
          <div className="mainGrumbs">
            <GrumbleList />
          </div>
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