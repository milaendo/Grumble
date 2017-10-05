import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' 
import { response } from '../actions/action'




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
				<form className="response" onSubmit={this.handleSubmit}>
					<h3>Post a comment {localStorage.getItem('displayName')}! Or don't. We don't care.</h3>
					<textarea rows='4' cols='120' className="responseInput" type="text" onChange={this.handleChange} name="response" value={this.state.response} />
					<button type= "submit">Submit</button>
				</form>
			</div> :
			<div className="responseBox">
		        <h3>You Must Be Logged In or Registered to Comment</h3> 
		        <Link to="/registration"><button type="submit">Register</button></Link>
		        <Link to="/login"><button type="submit">Login</button></Link>
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