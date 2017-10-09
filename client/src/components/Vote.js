import React, { Component } from 'react'
import { connect } from 'react-redux'
import { voteUp } from '../actions/action'
import { voteDown } from '../actions/action'
import { Icon } from 'semantic-ui-react'



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
    let voters = []
    const userid = localStorage.getItem('userid')

    this.props.voteData.forEach(function(item) {
      totalUpVotes.push(item.upvote)
      totalDownVotes.push(item.downvote)
      voters.push(item.userid)
    });

    let totalUp = totalUpVotes.reduce((a, b) => a + b, 0)
    let totalDown = totalDownVotes.reduce((a, b) => a + b, 0)
    let foundVoter = voters.filter(id => id == userid)

    const totalDiff = totalUp - totalDown


    return this.props.isAuthenticated ?
    	<div className="voteButton">
    		<div className="voteCenter">
    			<Icon link name='chevron up' color={foundVoter != 0 ? 'purple' : 'black'} type="submit" onClick={this.handleUpClick}></Icon>
    			<div className="voteCount">{totalDiff}</div>
    			<Icon link name='chevron down' color={foundVoter != 0 ? 'purple' : 'black'} type="submit" onClick={this.handleDownClick}></Icon>
        </div>
    	</div> :
    	<div>
    		<div className="voteButton">
    			<Icon link name='chevron up' type="submit"></Icon>
    			<div className="voteCount">{totalDiff}</div>
    			<Icon link name='chevron down'type="submit"></Icon>
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
