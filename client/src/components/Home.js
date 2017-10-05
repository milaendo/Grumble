import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleList from './GrumbleList'
import { getGrumbs } from '../actions/action'
import { getVotes } from '../actions/action'
import GrumbForm from './GrumbForm'

class MyComponent extends Component {

  componentWillMount() {
    getGrumbs()
    getVotes()
  }

  render() {
    return (
      <div className="containerHome">
          <div className="mainGrumbs">
            <GrumbForm />
            <GrumbleList data={this.props.grumbData} voteData={this.props.voteData} />
          </div>
      </div>
    )
  }
}

const stateToProps = function(appState) {
  return {
    grumbData: appState.app.grumbs,
    voteData: appState.app.grumbVotes
  }
}

export default connect(stateToProps)(MyComponent)