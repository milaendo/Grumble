import React, { Component } from 'react'

class SingleGrumb extends Component {
	
	render () {
		return this.props.data.active ?
			<div>
				<div>
					<h1 className="singleGrumb">{this.props.data.grumb}</h1>
				</div>
				<div>
					<h3>Grumbled by: {this.props.data.display_name}</h3>
				</div>
				<div>
					<span>{this.props.data.timestamp}</span>
				</div>
			</div> :
			<div>
				<div>
					<h1 className="singleGrumb">This grumb is no more!!</h1>
				</div>
				<div>
					<h3>Grumbled by: {this.props.data.display_name}</h3>
				</div>
				<div>
					<span>{this.props.data.timestamp}</span>
				</div>
			</div>
	}
}

export default SingleGrumb