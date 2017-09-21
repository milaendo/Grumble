import React, { Component } from 'react'
   

class Registration extends Component {
	state = {
		displayName: "",
		username: "",
		password: ""
	}


	handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  	handleFormSubmit = (e) => {
  	e.preventDefault()
  	fetch('/api/register', { 
        method: 'POST',
        body: {
          displayName: this.state.displayName,
      		username: this.state.username,
      		password: this.state.password
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    }
    ).then(response => {
      console.log(response, "yay");

    }).catch(err => {
      console.log(err, "boo!");
    });
    this.props.history.push('/')
  }
  render() {
    return (
    	<div className="container">
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