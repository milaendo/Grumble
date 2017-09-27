import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Vote extends Component {


	handleUpClick = (e) => {
		const userid = localStorage.getItem('userid')
		e.preventDefault()
  		axios({
	      method: 'post',
	      url: '/api/upvote',
	      data: {
	          userid: userid,
	          grumbid: this.props.data.id,
	          parentid: this.props.data.parentid
	        },
	      headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	          }
	      })
  		.then(response => {
      		console.log("Upvote Submitted Successfully", response);

    	}).catch(err => {
      		console.log("Upvote Not Submitted. Crap.", err);
    	});
	}


	handleDownClick = (e) => {
		const userid = localStorage.getItem('userid')
		e.preventDefault()
  		axios({
	      method: 'post',
	      url: '/api/downvote',
	      data: {
	          userid: userid,
	          grumbid: this.props.data.id,
	          parentid: this.props.data.parentid
	        },
	      headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	          }
	      })
  		.then(response => {
      		console.log("Downvote Submitted Successfully", response);

    	}).catch(err => {
      		console.log("Downvote Not Submitted. Crap.", err);
    	});
	}



  render() {
    return this.props.isAuthenticated ?
    	<div>
    		<div>
    			<button type="submit" onClick={this.handleUpClick}>Agrumb</button>
    			<span>+11</span>
    			<button type="submit" onClick={this.handleDownClick}>Disagrumb</button>
    		</div>
    	</div> :
    	<div>
    		<div>
    			<button type="submit">Agrumb</button>
    			<span>-9</span>
    			<button type="submit">Disagrumb</button>
    		</div>
    	</div>
  }
}

function mapStateToProps(appState, ownProps) {
  return {
    isAuthenticated: appState.auth.isAuthenticated,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(Vote)