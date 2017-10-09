import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import moment from 'moment'


class GrumbleItem extends Component {

  static defaultProps = {
    active: true
  }

  render() {
    return this.props.active ?
    	<div className="grumbItem">
        		<div className='biggerMargin'>
              <Comment.Metadata>{this.props.display_name} says:</Comment.Metadata>
              <Comment.Text as='h2' className="singleGrumb">{this.props.grumb}</Comment.Text>
              <Comment.Metadata>{moment(this.props.timestamp).format('MMM Do YYYY')} |Total Votes: {this.props.upvote + this.props.downvote}|</Comment.Metadata>
        		</div>
    	</div> :

        <div className="grumbItem">
            <Link className="link" to={/singleGrumb/ + this.props.id}>
                <div>
                    <Comment.Text as='h2'>This grumb is no more!</Comment.Text>
                    <Comment.Metadata id='grumdby'>Grumbled by:{this.props.display_name}</Comment.Metadata> <Comment.Metadata>{moment(this.props.timestamp).format('MMM Do YYYY')} |Total Votes: {this.props.upvote + this.props.downvote}|</Comment.Metadata>
                </div>
            </Link>
        </div>
  }
}

export default GrumbleItem
