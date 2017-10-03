import React, { Component } from 'react'
import axios from 'axios'
import { getGrumbs } from '../actions/action'

class GrumbForm extends Component {
	state = {
		grumb: ""
	}

	handleChange = (e) => {
		this.setState({
      		[e.target.name]: e.target.value
    	})
  	}
	
  	handleSubmit = (e) => {
  		e.preventDefault()
  		axios({
	      method: 'post',
	      url: '/api/grumb',
	      data: {
	          grumb: this.state.grumb,
	          user: localStorage.getItem("userid")
	        },
	      headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	          }
	      })
  		.then(response => {
      		console.log(response, "yay");

    	}).then(e =>{getGrumbs()})

      .catch(err => {
      		console.log(err, "boo!");
    	});

  		this.props.history.push('/')
  		}

  render() {
    return (
    	<div className="container">
    		<h1>Post a Grumb!</h1>
    		<form onSubmit={this.handleSubmit}>
    			<input type="textarea" onChange={this.handleChange} name="grumb" value={this.state.grumb} placeholder="Post a grumb" />
    			<button type="submit">Grumblize It!</button>
    		</form>
    	</div>     
    )
  }
}

export default GrumbForm