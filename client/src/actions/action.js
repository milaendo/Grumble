import store from '../store'
import axios from 'axios'
// example actions

import {GET_GRUMBS} from './actionValues'

export function getGrumbs() {
  axios.get('/api/grumbles')
   .then(response => {
      console.log(response, "yay")
      store.dispatch({
      type: GET_GRUMBS,
      payload: response.grumbles
    });
    }).catch(err => {
      console.log(err, "boo!");
    })
    
}

export function singleGrumb(){
  axios.get('/singleGrumb')
  .then(response => {
    console.log('axois winn')
    store.dispatch({
      type: GET_GRUMBS
    })
  })
}