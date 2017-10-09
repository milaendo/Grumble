import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleItem from './GrumbleItem'
import Vote from './Vote'
import { Link } from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


class GrumbleList extends Component {


  render() {
    return (
      <Comment.Group size='massive'>
      	<div className="container">
          		{this.props.data.map(item => (
                <div key={item.id} className="voteGrumb">
                    <div>
                      <Vote grumbid={item.id} parentid={item.parentid} voteData={this.props.votes.filter(vote => item.id === vote.grumbid)}/>
                    </div>
                    <Link className="link" to={/singleGrumb/ + item.id}>
                      <Comment>
                        <div className="vote">
                           <GrumbleItem {...item} />
                        </div>
              			  </Comment>
                    </Link>
              </div>
          		))}
      	</div>
      </Comment.Group>
    )
  }
}

const mapStateToProps = function(appState) {
  return {
    votes: appState.app.grumbVotes
  }
}

export default connect(mapStateToProps)(GrumbleList)
