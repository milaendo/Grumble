import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleList from './GrumbleList'
// import { getGrumbs } from '../actions/action'
// import { getVotes } from '../actions/action'
import GrumbForm from './GrumbForm'
import FilterBar from './FilterBar'


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
            <FilterBar />
            <GrumbleList data={this.props.grumbData} />
          </div>
      </div>
    )
  }
}

const stateToProps = function(appState) {
  return {
    grumbData: appState.app.grumbs,
  }
}

export default connect(stateToProps)(MyComponent)
