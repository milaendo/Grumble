import React, { Component } from 'react'
import { grumbSubmit } from '../actions/action'
import { Link } from 'react-router-dom'
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
      const userid = localStorage.getItem("userid")
      grumbSubmit({grumb: this.state.grumb, user: userid})
  	}

  render() {
    return this.props.isAuthenticated ?
    	<div id='grumbform'>
    		<form onSubmit={this.handleSubmit} className='formGrumb'>
    			<textarea rows='4' cols='100' onChange={this.handleChange} name="grumb" value={this.state.grumb} placeholder={localStorage.getItem('displayName')+" ,What do you want to Grumble about today?" }/>
          <button type="submit">Grumblize</button>
    		</form>
    	</div> : 
      <div id="grumbform">
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
