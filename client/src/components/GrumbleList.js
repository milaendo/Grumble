import React, { Component } from 'react'
import { connect } from 'react-redux'
import GrumbleItem from './GrumbleItem'
import Vote from './Vote'


class GrumbleList extends Component {


  render() {
    return (
    	<div className="container">
    		{this.props.data.map(item => (
    			<div key={item.id}>
            <div>
              <Vote data={item} />
            </div>
            <div>
    				  <GrumbleItem data={item} />
            </div>
    			</div>
    		))}
    	</div>    
    )
  }
}

//////I decided to make this a dumb component so essentially, it'll map whatever we send it via props. -RC


// const stateToProps = function(appState) {
//   return {
//     grumb: appState.app.grumbs // ".app" because we ran combineReducers
//   }
// }

// export default connect(stateToProps)(GrumbleList)


export default GrumbleList

