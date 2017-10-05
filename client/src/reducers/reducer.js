
import {GET_GRUMBS, ONE_GRUMB, CLEAR_GRUMB, CLEAR_RESPONSES, GET_RESPONSES, GET_VOTES, GET_VOTE} from '../actions/actionValues'

const initialState = {
  grumbs: [],
  grumbVotes: [],
  grumb:{},
  grumbVote: {
    upvote: "",
    downvote: ""
  },
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
    case GET_VOTES:
      return {...state, grumbVotes: action.payload}
    case GET_VOTE:
      return {...state, grumbVote: {upvote: action.upvote, downvote: action.downvote}}
    case CLEAR_GRUMB:
      return {...state, grumb: {}}
    case CLEAR_RESPONSES:
      return {...state, responses: []}
    default:
      return state
  }
}