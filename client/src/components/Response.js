import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { response } from '../actions/action'
import { Button, Form, Message } from 'semantic-ui-react'



class Response extends Component {
	state={
		response:''
	}

	handleChange = (e) => {
		this.setState({
      		[e.target.name]: e.target.value
    	})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const userid = localStorage.getItem('userid')
		response({response: this.state.response, userid: userid, parentid: this.props.data})

    	this.setState({
      		response: ""
    	})

	}

	render () {
		return this.props.isAuthenticated ?
			<div className="responseBox">
				<Form className="response" onSubmit={this.handleSubmit}>
					<Form.Field>
						<h3>Say something back {localStorage.getItem('displayName')}! Or don't. We don't care.</h3>
					</Form.Field>
					<Form.Field>
						<Form.TextArea className="responseInput" type="text" onChange={this.handleChange} name="response" value={this.state.response} />
					</Form.Field>
					<Button type= "submit">Submit</Button>
				</Form>
			</div> :
			<div className="responseBox">
				<Message negative>
					<Message.Header>Hey, Genius, you need to <Link to="/login">Log in</Link> or <Link to="/registration">Sign up</Link> to respond to a grumb</Message.Header>
				</Message>
		    </div>
	}
}

function mapStateToProps(appState, ownProps) {
  return {
    isAuthenticated: appState.auth.isAuthenticated,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(Response)
