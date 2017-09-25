import store from '../store'
import axios from 'axios'
// example actions

import {GET_GRUMBS, ONE_GRUMB} from './actionValues'

export function getGrumbs() {
  axios.get('/api/grumbs')
   .then(response => {
      console.log(response, "yay")
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