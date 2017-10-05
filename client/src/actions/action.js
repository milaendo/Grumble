import store from '../store'
import axios from 'axios'
// example actions

import {GET_GRUMBS, ONE_GRUMB, GET_RESPONSES, GET_VOTE, GET_VOTES} from './actionValues'

export function getGrumbs() {
  axios.get('/api/grumbs')
   .then(response => {
      store.dispatch({
      type: GET_GRUMBS,
      payload: response.data.grumbs
    });
    }).catch(err => {
      console.log(err, "boo!");
    })
    
}

export function oneGrumb(grumbid){
  axios.get('/api/singleGrumb/' + grumbid)
  .then(response => {
    store.dispatch({
      type: ONE_GRUMB,
      payload:response.data.grumb[0]
    })
  }).catch(err => {
    console.log(err, "not working")
  })
}



export function getResponses(grumbid) {
  axios.get('/api/responses/' + grumbid)
  .then(response => {
      store.dispatch({
      type: GET_RESPONSES,
      payload: response.data.responses
    });
    }).catch(err => {
      console.log(err, "boo!");
    })
}

export function getVote(grumbid) {
  axios({
        method: 'post',
        url: '/api/getvote',
        data: {
            grumbid: grumbid
          },
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
  .then(response => {
      store.dispatch({
      type: GET_VOTE,
      payload: {
        upvote: response.data.upvote,
        downvote: response.data.downvote
      }
    });
    }).catch(err => {
      console.log(err, "boo!");
      })
}


export function getVotes() {
  axios.get('/api/getvotes')
   .then(response => {
      console.log("success (getVotes)", response)
      store.dispatch({
      type: GET_VOTES,
      payload: response.data.votes
    });
    }).catch(err => {
      console.log(err, "boo!");
    })
}