import React, { Component } from 'react'
import {loginUser, logoutUser} from '../lib/auth'
import {connect} from 'react-redux'

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
    	<div className="container">
    		<h1>Login</h1>
    		<form onSubmit={this.handleFormSubmit}>
	    		<input type="text" onChange={this.handleChange} name="username" value={this.state.username} placeholder="Username" />
	    		<input type="text" onChange={this.handleChange} name="password" value={this.state.password} placeholder="Password" />
	    		<button type="submit">Nobody Cares.</button>
	    	</form>
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