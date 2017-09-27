import React, { Component } from 'react'

class SingleGrumb extends Component {
	
	render () {
		return(
			<div>
				<div>
					<h1>{this.props.data.grumb}</h1>
				</div>
				<div>
					<h3>written by: {this.props.data.display_name}</h3>
				</div>
				<div>
					<span>{this.props.data.timestamp}</span>
				</div>
			</div>
		)
	}
}

export default SingleGrumb