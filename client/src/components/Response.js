import React, { Component } from 'react'
import axios from 'axios'

class Response extends Component {
	state={
		response:''
	}
	handleSubmit = (e) => {
		e.preventDefault()
  		axios({
	      method: 'post',
	      url: '/api/response/',
	      data: {
	          response: this.state.response
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
	}
	handleChange = (e) => {
		[e.target.name] = e.target.value
	}
	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type='hidden' value={this.props.match.params.grumbid} name='parentid'/>
					<input type='hidden' value={localStorage.getItem('userid')} name='userid'/>
					<input type="textarea" onChange={this.handleChange} name="grumb" value={this.state.response} placeholder="Post your response" />
					<button type="submit">Grumblize It!</button>
				</form>
			</div>
		)
	}
}

export default Response