import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleItem from './GrumbleItem'
import Vote from './Vote'


class GrumbleList extends Component {


  render() {
    return (
    	<div className="container">
    		{this.props.data.map(item => (
    			<div key={item.id} className="voteGrumb">
            <div> 
              <Vote grumbid={item.id} parentid={item.parentid} voteData={this.props.votes.filter(vote => item.id === vote.grumbid)}/> 
            </div>
            <div className="vote">
              <GrumbleItem data={item} />
            </div>
    			</div>
    		))}
    	</div>    
    )
  }
}




const mapStateToProps = function(appState) {
  return {
    votes: appState.app.grumbVotes 
  }
}

export default connect(mapStateToProps)(GrumbleList)




