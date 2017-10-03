import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

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

    	}).catch(err => {
      		console.log(err, "boo!");
    	});

  		// this.props.history.push('/')

  		}

  render() {
    return this.props.isAuthenticated ?
    	<div className="container" id='grumbform'>
    		 {/*<h1>Post a Grumb!</h1>*/}
    		<form onSubmit={this.handleSubmit} className='formGrumb'>
    			<input type="textarea" onChange={this.handleChange} name="grumb" value={this.state.grumb} placeholder="Post a grumb" />
    			<button type="submit">Grumblize</button>
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

export default connect(mapStateToProps)(GrumbForm)
