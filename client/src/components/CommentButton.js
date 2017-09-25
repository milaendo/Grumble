import React, { Component } from 'react'
import {Authorize} from '../lib/auth'

class CommentButton extends Component {
  render() {
    return (
    	<button type="submit">Submit</button>     
    )
  }
}

export default Authorize(CommentButton)