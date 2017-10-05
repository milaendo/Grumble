import React, { Component } from 'react'
import { register } from '../actions/action'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

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
    register({displayName: this.state.displayName, username: this.state.username, password: this.state.password})

    this.props.history.push('/Login')
  }

  render() {
    return (
    	<div className='signWrap' >
        <Message
          attached
          header='Welcome Grumble'
          content='Fill out the form below to sign-up for a new account...or Dont.'
        />
	    		<Form className="signUp" onSubmit={this.handleFormSubmit}>
  	    		<Form.Input type="text" onChange={this.handleChange} name="displayName" value={this.state.displayName} placeholder="Choose a display name" />
  	    		<Form.Input type="text" onChange={this.handleChange} name="username" value={this.state.username} placeholder="Create a username" />
  	    		<Form.Input type="password" onChange={this.handleChange} name="password" value={this.state.password} placeholder="Create a password" />
            <Form.Checkbox inline label='I agree to...stuff' />
  	    		<Button type="submit">Submit</Button>
	        </Form>
        <Message attached='bottom' warning>
          <Icon name='help' />
          Already signed up?&nbsp;<Link to='/Login'>Login here</Link>&nbsp;instead.
        </Message>
	    </div>
    )
  }
}

export default Registration
