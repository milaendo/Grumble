import React, { Component } from 'react'
import {loginUser, logoutUser} from '../lib/auth'
import {connect} from 'react-redux'
import { Button, Form, Input } from 'semantic-ui-react'


class Login extends Component {

	state = {
		username: "",
		password: ""
	}

	componentWillMount() {
    this.props.dispatch(logoutUser())
  }

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleFormSubmit = (e) => {
		e.preventDefault()
  		this.props.dispatch(loginUser({username: this.state.username, password:this.state.password}))

  		this.props.history.push('/')///////////Eventually, this should go to profile. I believe. RC
	}


  render() {
    return (
    	<div className="signWrap">
    		<h1>Login</h1>
    		<div>
	    		<Form onSubmit={this.handleFormSubmit}>
						<Form.Field>
			    		<Input type="text" onChange={this.handleChange} name="username" value={this.state.username} placeholder="Username" />
						</Form.Field>
						<Form.Field>
			    		<Input type="password" onChange={this.handleChange} name="password" value={this.state.password} placeholder="Password" />
						</Form.Field>
						<Form.Field>
			    		<Button type="submit">Nobody Cares.</Button>
						</Form.Field>
		    	</Form>
	    	</div>
	    </div>
    )
  }
}

function mapStateToProps(appState) {
  const {isAuthenticated, errorMessage, isFetching} = appState.auth

  return {
    isAuthenticated,
    isFetching,
    errorMessage
  }
}

export default connect(mapStateToProps)(Login)
