import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom' 




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
		const userid = localStorage.getItem('userid')
		e.preventDefault()
  		axios({
	      method: 'post',
	      url: '/api/response/',
	      data: {
	          response: this.state.response,
	          userid: userid,
	          parentid: this.props.data
	        },
	      headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	          }
	      })
  		.then(response => {
      		console.log(response, "working response");

    	}).catch(err => {
      		console.log(err, "not working response");
    	});

    	this.setState({
      		response: ""
    	})

	}

	

	render () {
		return this.props.isAuthenticated ?
			<div className="responseBox">
				<form className="response" onSubmit={this.handleSubmit}>
					<h3>Post a comment {localStorage.getItem('displayName')}! Or don't. We don't care.</h3>
					<input className="responseInput" type="text" onChange={this.handleChange} name="response" value={this.state.response} />
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