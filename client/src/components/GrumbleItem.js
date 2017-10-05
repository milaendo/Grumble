import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


class GrumbleItem extends Component {

  static defaultProps = {
    active: true
  }

  render() {
    return this.props.active ?
    	<div className="grumbItem">
        		<div>
        			<Comment.Text as='h3' className="singleGrumb">{this.props.data.grumb}</Comment.Text>
                <Comment.Author>Grumbled by:{this.props.data.display_name}</Comment.Author>
                <Comment.Metadata>{this.props.data.timestamp} Votes: {this.props.upvote + this.props.downvote}</Comment.Metadata>
        		</div>
    	</div> :

        <div className="grumbItem">
            <Link className="link" to={/singleGrumb/ + this.props.id}>
                <div>
                    <h2 className="removed">This grumb is no more!</h2>
                    <span id='grumdby'>Grumbled by:{this.props.display_name} {this.props.timestamp} Votes: {this.props.upvote + this.props.downvote}</span>
                </div>
            </Link>
        </div>
  }
}

export default GrumbleItem
