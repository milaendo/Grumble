// import React, { Component } from 'react'
// import axios from 'axios'
// import {Authorize} from '../lib/auth'

// class CommentButton extends Component {

// 	handleClickUser = (e) => {
// 		e.preventDefault()
//   		axios({
// 	      method: 'post',
// 	      url: '/api/response/',
// 	      data: {
// 	          response: this.props.response,
// 	          userid: this.props.userid,
// 	          parentid: this.props.parentid
// 	        },
// 	      headers: {
// 	            'Accept': 'application/json',
// 	            'Content-Type': 'application/json'
// 	          }
// 	      })
//   		.then(response => {
//       		console.log(response, "working response");

//     	}).catch(err => {
//       		console.log(err, "not working response");
//     	});

// 	}
// 	}


// 	handleClickNonUser = (e) => {
// 		this.props.history.push('/login')/////////Need to create alert instead, but for now...RC
// 	}



// render() {

//       return this.props.isAuthenticated ?
//         <button type="submit" onClick={this.handleClickUser}>Submit</button> :
//         <button type="submit" onClick={this.handleClickNonUser}>Submit</button>
//     }
// }

// function mapStateToProps(appState, ownProps) {
//   return {
//     isAuthenticated: appState.auth.isAuthenticated,
//     ...ownProps
//   }
// }

// export default connect(mapStateToProps)(CommentButton)