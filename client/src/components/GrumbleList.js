import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleItem from './GrumbleItem'

class GrumbleList extends Component {

  render() {
    return (
    	<div className="container">
    		{this.props.grumb.map(item => (
    			<div key={item.id}>
    				<GrumbleItem data={item} />
    			</div>
    		))}
    	</div>     
    )
  }
}

const stateToProps = function(appState) {
	console.log("Grumbstate", appState)
  return {
    grumb: appState.app.grumbs // ".app" because we ran combineReducers
  }
}

export default connect(stateToProps)(GrumbleList)

