import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class GrumbleItem extends Component {

  static defaultProps = {
    active: true
  }

  render() {
    console.log(this.props.active)
    return (this.props.active ?
        <div className="grumbItem">
            <Link className="link" to={/singleGrumb/ + this.props.id}>
                <div>
                    <h2 className="singleGrumb">{this.props.grumb}</h2>
                    <span>Grumbled by:{this.props.display_name} {this.props.timestamp} Votes: {this.props.upvote + this.props.downvote}</span>
                </div>
            </Link>         
        </div> :
        <div className="grumbItem">
            <Link className="link" to={/singleGrumb/ + this.props.id}>
                <div>
                    <h2 className="removed">This grumb is no more!</h2>
                    <span id='grumdby'>Grumbled by:{this.props.display_name} {this.props.timestamp} Votes: {this.props.upvote + this.props.downvote}</span>
                </div>
            </Link>         
        </div>
    )
  }
}

export default GrumbleItem