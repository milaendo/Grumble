import store from '../store'
import axios from 'axios'

import {GET_GRUMBS, SEARCH_GRUMBS, ONE_GRUMB, CLEAR_GRUMB, CLEAR_RESPONSES, GET_RESPONSES, GET_VOTE, GET_VOTES} from './actionValues'


export function register(data) {
  axios({
      method: 'post',
      url: '/api/register',
      data: {
          displayName: data.displayName,
          username: data.username,
          password: data.password
        },
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      })
    .then(response => {
      console.log(response, "yay");

    }).catch(err => {
      console.log(err, "boo!");
    });
}


export function response(data) {
  axios({
        method: 'post',
        url: '/api/response/',
        data: {
            response: data.response,
            userid: data.userid,
            parentid: data.parentid
          },
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
      .then(response => {
          console.log(response, "working response");

      }).then(e =>{getResponses(data.parentid)})


      .catch(err => {
          console.log(err, "not working response");
      });
}


export function grumbSubmit(data) {
  axios({
        method: 'post',
        url: '/api/grumb',
        data: {
            grumb: data.grumb,
            user: data.user
          },
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
      .then(response => {
          console.log(response, "yay");

      }).then(e => {getGrumbs()})

      .catch(err => {
          console.log(err, "boo!");
      });

}



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

export function searchGrumbs(data) {
  axios({
        method: 'post',
        url: '/api/search',
        data: {
            search: data
          },
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
      .then(response => {
          console.log("Grumb Search Success!", response)
          store.dispatch({
          type: SEARCH_GRUMBS,
          payload: response.data.grumbs
          });
      }).catch(err => {
          console.log("Grumb Search Unsuccessful:(", err);
      });


      
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


export function clearGrumb() {
  store.dispatch({
    type: CLEAR_GRUMB
  })
}


export function clearResponses() {
  store.dispatch({
    type: CLEAR_RESPONSES
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


export function voteUp(data) {
  axios({
        method: 'post',
        url: '/api/upvote',
        data: {
            userid: data.userid,
            grumbid: data.grumbid,
            parentid: data.parentid
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


export function voteDown(data) {
  axios({
        method: 'post',
        url: '/api/downvote',
        data: {
            userid: data.userid,
            grumbid: data.grumbid,
            parentid: data.parentid
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
