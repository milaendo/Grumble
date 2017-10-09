import React, { Component } from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import moment from 'moment'



class SingleGrumb extends Component {

	static defaultProps = {
		active: true
	}

	render () {
		return (this.props.active ?
			<Comment className="singleGrumbBox">
				<Comment.Metadata className='largerFont'>{this.props.display_name} says:</Comment.Metadata>
				<Comment.Text as='h2' className="singleGrumb">{this.props.grumb}</Comment.Text>
				<Comment.Metadata className='largerFont'>{moment(this.props.timestamp).format('MMM Do YYYY')}</Comment.Metadata>
			</Comment> 	:
			<Comment className="singleGrumbBox">
					<Comment.Text as='h1' className="singleGrumb">This grumb is no more!!</Comment.Text>
					<Comment.Metadata>Grumbled by: {this.props.display_name} {moment(this.props.timestamp).format('MMM Do YYYY')}</Comment.Metadata>
			</Comment>
		)
	}
}

export default SingleGrumb
