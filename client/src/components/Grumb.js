import React, { Component } from 'react'

import {connect} from 'react-redux'
import {oneGrumb} from '../actions/action'
import {getResponses} from '../actions/action'

import Response from './Response'
import GrumbleList from './GrumbleList'
import SingleGrumb from './SingleGrumb'


class Grumb extends Component {

	componentWillMount(){
		oneGrumb(this.props.match.params.grumbid)
		getResponses(this.props.match.params.grumbid)
	}

	// componentWillUpdate(){
	// 	getResponses(this.props.match.params.grumbid)  ///////This isn't working right. Need advice.
	// }

	// componentWillReceiveProps(props){
	// 	if (props.grumb.id !== props.match.params.grumbid) {
	// 		getResponses(props.match.params.grumbid)
	// 	}

	// }


	render () {
		return (
			<div>
				<SingleGrumb data={this.props.grumb} />
				<Response data={this.props.grumb.id}/>
				<GrumbleList data={this.props.responses}/>
			</div>
		)
	}
}

function stateToProps(appState){
	return {
		grumb: appState.app.grumb, 
		responses: appState.app.responses
	}
}

export default connect(stateToProps)(Grumb)