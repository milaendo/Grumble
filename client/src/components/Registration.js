import React, { Component } from 'react'
   

class Registration extends Component {
	state = {
		displayName: "",
		username: "",
		password: ""
	}


	handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  	handleFormSubmit = e => {
  	e.preventDefault()

  	fetch('/register', { 
        method: 'POST',
        data: {
          	displayName: this.state.message,
    		username: this.state.username,
    		password: this.state.password
        }
      })
      // .then(function(response) {
      //   return response.json()
      // }).then(function(body) {
      //   console.log(body);
      // });

      this.props.history.push('/')
  }
  render() {
    return (
    	<div>
    		<h1>Signup for Grumble!</h1>
	    		<form className="signUp" onSubmit={this.handleFormSubmit}>
	    		<input type="text" onChange={this.handleChange} name="displayName" value={this.state.displayName} placeholder="Choose a display name" />
	    		<input type="text" onChange={this.handleChange} name="username" value={this.state.username} placeholder="Create a username" />
	    		<input type="text" onChange={this.handleChange} name="password" value={this.state.password} placeholder="Create a password" />
	    		<button type="submit">Submit</button>
	    		</form>
	    </div>      
    )
  }
}

export default Registration