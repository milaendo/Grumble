// if you so choose, you may name your actions and import them here
// for reducing typing errors
import {GET_GRUMBS, ONE_GRUMB, GET_RESPONSES} from '../actions/actionValues'

const initialState = {
  grumbs: [],
  grumb:{},
  responses: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GRUMBS:
      return {...state, grumbs: action.payload}
    case ONE_GRUMB:
    	return {...state, grumb: action.payload}
    case GET_RESPONSES:
      return {...state, responses: action.payload}
    default:
      return state
  }
}