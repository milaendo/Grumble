import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteUp } from '../actions/action'
import { voteDown } from '../actions/action'



class Vote extends Component {



	handleUpClick = (e) => {
		e.preventDefault()
    const userid = localStorage.getItem('userid')
    voteUp({userid: userid, grumbid: this.props.id, parentid: this.props.parentid})

	}


	handleDownClick = (e) => {
		e.preventDefault()
    const userid = localStorage.getItem('userid')
    voteDown({userid: userid, grumbid: this.props.id, parentid: this.props.parentid})
  	
	}



  render() {
    
    // let totalUpVotes = []
    // let totalDownVotes = []
    // let voters = []
    // const userid = localStorage.getItem('userid')

    // this.props.voteData.forEach(function(item) {    
    //   totalUpVotes.push(item.upvote)
    //   totalDownVotes.push(item.downvote)
    //   voters.push(item.userid)           
    // });

    // let totalUp = totalUpVotes.reduce((a, b) => a + b, 0)
    // let totalDown = totalDownVotes.reduce((a, b) => a + b, 0)
    // let foundVoter = voters.filter(id => id == userid)

    // const totalDiff = totalUp - totalDown
    // const total = totalUp + totalDown


    return this.props.isAuthenticated ?
    	<div className="voteButton">
    		<div>
    			<button className={this.props.voteStatus ? "buttonUpVoted" : "buttonUp"} type="submit" onClick={this.handleUpClick}></button>
    			<div className="voteCount">{this.props.differential ? this.props.differential : 0}</div>
    			<button className={this.props.voteStatus ? "buttonDownVoted" : "buttonDown"} type="submit" onClick={this.handleDownClick}></button>
        </div>
    	</div> :
    	<div>
    		<div className="voteButton">
    			<button className="buttonUpVoted" type="submit"></button>
    			<div className="voteCount">{this.props.differential ? this.props.differential : 0}</div>
    			<button className="buttonDownVoted" type="submit"></button>
    		</div>
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