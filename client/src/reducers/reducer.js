// if you so choose, you may name your actions and import them here
// for reducing typing errors
import {GET_GRUMBS, ONE_GRUMB, GET_RESPONSES, GET_VOTES} from '../actions/actionValues'

const initialState = {
  grumbs: [],
  grumb:{},
  responses: [],
  grumbVote: {
    upvote: "",
    downvote: ""
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GRUMBS:
      return {...state, grumbs: action.payload}
    case ONE_GRUMB:
    	return {...state, grumb: action.payload}
    case GET_RESPONSES:
      return {...state, responses: action.payload}
    case GET_VOTES:
      return {...state, grumbVote: {upvote: action.payload.upvote, downvote: action.payload.downvote}}
    default:
      return state
  }
}