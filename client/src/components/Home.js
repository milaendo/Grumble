import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleList from './GrumbleList'
import { getGrumbs } from '../actions/action'

class MyComponent extends Component {

  componentWillMount() {
    getGrumbs()
  }

  render() {
    return (
      <div className="container">
          <div className="mainGrumbs">
            <GrumbleList data={this.props.grumbData} />
          </div>
      </div>
    )
  }
}

const stateToProps = function(appState) {
  return {
    grumbData: appState.app.grumbs
  }
}

export default connect(stateToProps)(MyComponent)