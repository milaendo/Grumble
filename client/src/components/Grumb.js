import React, { Component } from 'react'

import {connect} from 'react-redux'
import {oneGrumb} from '../actions/action'
import {getResponses} from '../actions/action'
// import {getVotes} from '../actions/action'
import {clearGrumb} from '../actions/action'
import {clearResponses} from '../actions/action'

import Response from './Response'
import GrumbleList from './GrumbleList'
import SingleGrumb from './SingleGrumb'
import Vote from './Vote'


class Grumb extends Component {

	componentWillMount(){
		const grumbid = this.props.match.params.grumbid
		const userid = localStorage.getItem('userid')
		oneGrumb({grumbid: grumbid, userid: userid})
		getResponses({grumbid: grumbid, userid: userid})
		// getVotes()
	}


	componentWillUnmount() {
		clearGrumb()
		clearResponses()
	}


	render () {
		return (
			<div className="container">
				<div className="voteGrumb">
					<div>
						<Vote {...this.props.grumb}  />
					</div>
					<div>
						<SingleGrumb {...this.props.grumb} />
					</div>
				</div>
				<div>
					<Response data={this.props.grumb.id} />
				</div>
				<div>
					<GrumbleList data={this.props.responses} />
				</div>				
			</div>
		)
	}
}

function stateToProps(appState){
	return {
		grumb: appState.app.grumb, 
		responses: appState.app.responses,
		// votes: appState.app.grumbVotes
	}
}

export default connect(stateToProps)(Grumb)