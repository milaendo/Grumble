import React, { Component } from 'react'
import {connect} from 'react-redux'
import {oneGrumb} from '../actions/action'
import Response from './Response'


class SingleGrumb extends Component {
	static defaultProps={
		grumb:{}
	}
	componentWillMount(){
		oneGrumb(this.props.match.params.grumbid)
	}
	render () {
		console.log('info',this.props)
		return (
			<div>
				<div>
					<h1>Single Grumb</h1>
				</div>
				<div className='singleGrumb'>
					<div>{this.props.grumb.grumb}</div>
					<div>written by:{this.props.grumb.display_name}</div>
					<div>{this.props.grumb.timestamp}</div>
				</div>
				<Response />
			</div>
		)
	}
}

function stateToProps(appState){
	return {
		grumb: appState.app.grumb //*app because combined reducers
	}
}

export default connect(stateToProps)(SingleGrumb)