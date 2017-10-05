import React, { Component } from 'react'

import {connect} from 'react-redux'
import {oneGrumb} from '../actions/action'
import {getResponses} from '../actions/action'
import {getVotes} from '../actions/action'
import {clearGrumb} from '../actions/action'

import Response from './Response'
import GrumbleList from './GrumbleList'
import SingleGrumb from './SingleGrumb'
import Vote from './Vote'


class Grumb extends Component {

	componentWillMount(){
		oneGrumb(this.props.match.params.grumbid)
		getResponses(this.props.match.params.grumbid)
		getVotes()
	}


	componentWillUnmount() {
		clearGrumb()
	}


	render () {
		return (
			<div className="container">
				<div className="voteGrumb">
					<div>
						<Vote grumbid={this.props.grumb.id} parentid={this.props.grumb.parentid} voteData={this.props.votes.filter(vote => this.props.grumb.id === vote.grumbid)}  />
					</div>
					<div>
						<SingleGrumb data={this.props.grumb} />
					</div>
				</div>
				<div>
					<Response data={this.props.grumb.id} />
				</div>
				<div>
					<GrumbleList data={this.props.responses} voteData={this.props.voteData} />
				</div>				
			</div>
		)
	}
}

function stateToProps(appState){
	return {
		grumb: appState.app.grumb, 
		responses: appState.app.responses,
		votes: appState.app.grumbVotes
	}
}

export default connect(stateToProps)(Grumb)