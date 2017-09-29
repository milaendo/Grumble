import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class GrumbleItem extends Component {
  render() {
    return this.props.data.active ?
    	<div className="grumbItem">
            <Link to={/singleGrumb/ + this.props.data.id}>
        		<div>
        			<h2>{this.props.data.grumb}</h2>
                    <span>Grumbled by:{this.props.data.display_name} {this.props.data.timestamp}</span>
        		</div>
        	</Link>			
    	</div> :
        <div className="grumbItem">
            <Link to={/singleGrumb/ + this.props.data.id}>
                <div>
                    <h2>This grumb is no more!</h2>
                    <span>Grumbled by:{this.props.data.display_name} {this.props.data.timestamp}</span>
                </div>
            </Link>         
        </div>     
  }
}

export default GrumbleItem