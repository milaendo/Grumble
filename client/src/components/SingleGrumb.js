import React, { Component } from 'react'

class SingleGrumb extends Component {
	
	static defaultProps = {
		active: true
	}

	render () {
		return (this.props.active ?
			<div className="singleGrumbBox">
				<div>
					<h1 className="singleGrumb">{this.props.grumb}</h1>
				</div>
				<div>
					<h3>Grumbled by: {this.props.display_name}</h3>
				</div>
				<div>
					<span>{this.props.timestamp} Total votes:{this.props.upvote + this.props.downvote}</span>
				</div>
			</div> 	:
			<div className="singleGrumbBox">
				<div>
					<h1 className="singleGrumb">This grumb is no more!!</h1>
				</div>
				<div>
					<h3>Grumbled by: {this.props.display_name}</h3>
				</div>
				<div>
					<span>{this.props.timestamp} Total votes:{this.props.upvote + this.props.downvote}</span>
				</div>
			</div>
		)	
	}
}

export default SingleGrumb