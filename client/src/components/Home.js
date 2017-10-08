import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleList from './GrumbleList'
// import { getGrumbs } from '../actions/action'
// import { getVotes } from '../actions/action'
import GrumbForm from './GrumbForm'

class MyComponent extends Component {

  // componentWillMount() {
  //   getGrumbs()
  //   getVotes()
  // }

  render() {
    return (
      <div className="containerHome">
          <div className="mainGrumbs">
            <GrumbForm />
            <GrumbleList data={this.props.grumbs} />
          </div>
      </div>
    )
  }
}

const stateToProps = function(appState) {
  return {
    grumbs: appState.app.grumbs,
  }
}

export default connect(stateToProps)(MyComponent)