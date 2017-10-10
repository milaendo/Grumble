import React, { Component } from 'react'
import { grumbSubmit } from '../actions/action'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { Button, Form } from 'semantic-ui-react'


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
      const userid = localStorage.getItem('userid')
      grumbSubmit({grumb: this.state.grumb, user: userid})
      this.setState({
        grumb: ""
      })
  	}

  render() {
    return this.props.isAuthenticated ?
    	<div id='grumbform'>
    		<Form onSubmit={this.handleSubmit} className='formGrumb'>
					<Form.Field>
	    			<Form.TextArea onChange={this.handleChange} className="responseInput" name="grumb" value={this.state.grumb} placeholder={localStorage.getItem('displayName')+", what do you want to Grumble about today?" } />
					</Form.Field>
					<Form.Field>
						<Button content='Submit' labelPosition='left' icon='edit' primary />
					</Form.Field>
    		</Form>
    	</div> :
      <div id="grumbform">
			 	<Message negative>
	        <Message.Header>Hey, Genius, you need to <Link to="/login">Log in</Link> or <Link to="/registration">Sign up</Link> to post a grumb</Message.Header>
			 	</Message>
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
