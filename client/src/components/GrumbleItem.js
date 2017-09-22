import React, { Component } from 'react'

class GrumbleItem extends Component {
  render() {
    return (
    	<div className="grumbItem">
    		<div>
    			<h2>{this.props.data.grumb}</h2>
    		</div>
    		<span>Grumbled by:{this.props.data.display_name} {this.props.data.timestamp}</span>    		
    	</div>     
    )
  }
}

export default GrumbleItem