import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getVotes } from '../actions/action'



class Vote extends Component {



	handleUpClick = (e) => {
		const userid = localStorage.getItem('userid')
		e.preventDefault()
  		axios({
	      method: 'post',
	      url: '/api/upvote',
	      data: {
	          userid: userid,
	          grumbid: this.props.grumbid,
	          parentid: this.props.parentid
	        },
	      headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	          }
	      })
  		.then(response => {
      		console.log("Upvote Submitted Successfully", response);

    	}).then(e =>{getVotes()})


      .catch(err => {
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
	          grumbid: this.props.grumbid,
	          parentid: this.props.parentid
	        },
	      headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	          }
	      })
  		.then(response => {
      		console.log("Downvote Submitted Successfully", response);

    	}).then(e => {getVotes()})

      .catch(err => {
      		console.log("Downvote Not Submitted. Crap.", err);
    	});
	}



  render() {
    
    let totalUpVotes = []
    let totalDownVotes = []

    this.props.voteData.forEach(function(item) {    
      totalUpVotes.push(item.upvote)
      totalDownVotes.push(item.downvote)           
    });

    let totalUp = totalUpVotes.reduce((a, b) => a + b, 0);
    let totalDown = totalDownVotes.reduce((a, b) => a + b, 0);

    const totalDiff = totalUp - totalDown
    const total = totalUp + totalDown



    
    
    

    return this.props.isAuthenticated ?
    	<div className="voteButton">
    		<div>
    			<button className="buttonUp" type="submit" onClick={this.handleUpClick}></button>
    			<span className="voteCount">{totalDiff}</span>
    			<button className="buttonDown" type="submit" onClick={this.handleDownClick}></button>
        </div>
        <span>Total votes: {total}</span>
    	</div> :
    	<div>
    		<div className="voteButton">
    			<button className="buttonUp" type="submit"></button>
    			<span className="voteCount">{totalDiff}</span>
    			<button className="buttonDown" type="submit"></button>
    		</div>
        <span>Total votes: {total}</span>
    	</div>
  }
}

function mapStateToProps(appState, ownProps) {
  return {
    isAuthenticated: appState.auth.isAuthenticated,
    ...ownProps       
  }
}

export default connect(mapStateToProps)(Vote)