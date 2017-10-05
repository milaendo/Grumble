import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getVotes } from '../actions/action'
import { voteUp } from '../actions/action'
import { voteDown } from '../actions/action'



class Vote extends Component {



	handleUpClick = (e) => {
		e.preventDefault()
    const userid = localStorage.getItem('userid')
    voteUp({userid: userid, grumbid: this.props.grumbid, parentid: this.props.parentid})

	}


	handleDownClick = (e) => {
		e.preventDefault()
    const userid = localStorage.getItem('userid')
    voteDown({userid: userid, grumbid: this.props.grumbid, parentid: this.props.parentid})
  	
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