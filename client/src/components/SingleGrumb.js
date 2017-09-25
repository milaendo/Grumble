import React, { Component } from 'react'
import CommentButton from './CommentButton'

class SingleGrumb extends Component {
	static defaultProps={
		grumb:[]
	}
	componentWillMount(){
		SingleGrumb()
	}
	render () {
		return (
			<div>
				<h1>1 is the loneliest number :(</h1>
					{this.props.grumb}
				<CommentButton />
			</div>
		)
	}
}

function stateToProps(appState,compProps){
	return {
		grumb:appState.grumbs
	}
}

export default connect(stateToProps)(SingleGrumb)