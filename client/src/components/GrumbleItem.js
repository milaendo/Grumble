import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


class GrumbleItem extends Component {

    componentWillReceiveProps() {
    }


  render() {
    return this.props.data.active ?
    	<div className="grumbItem">
        		<div>
        			<Comment.Text as='h3' className="singleGrumb">{this.props.data.grumb}</Comment.Text>
                <Comment.Author>Grumbled by:{this.props.data.display_name}</Comment.Author>
                <Comment.Metadata>{this.props.data.timestamp}</Comment.Metadata>
        		</div>
    	</div> :
        <div className="grumbItem">
            <Link className="link" to={/singleGrumb/ + this.props.data.id}>
                <div>
                    <h2 className="removed">This grumb is no more!</h2>
                    <span id='grumdby'>Grumbled by:{this.props.data.display_name} {this.props.data.timestamp}</span>
                </div>
            </Link>
        </div>
  }
}

export default GrumbleItem
