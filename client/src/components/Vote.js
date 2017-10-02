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
    	<div className="voteButton">
    		<div>
    			<button className="buttonUp" type="submit" onClick={this.handleUpClick}></button>
    			<span className="voteCount">{this.props.votes}</span>
    			<button className="buttonDown" type="submit" onClick={this.handleDownClick}></button>
    		</div>
    	</div> :
    	<div>
    		<div className="voteButton">
    			<button className="buttonUp" type="submit"></button>
    			<span className="voteCount">{this.props.votes}</span>
    			<button className="buttonDown" type="submit"></button>
    		</div>
    	</div>
  }
}

function mapStateToProps(appState, ownProps) {
  console.log('appState', appState)
  return {
    isAuthenticated: appState.auth.isAuthenticated,
    ...ownProps,
    
  }
}

export default connect(mapStateToProps)(Vote)