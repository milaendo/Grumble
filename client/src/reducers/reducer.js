// if you so choose, you may name your actions and import them here
// for reducing typing errors
import {GET_GRUMBS} from '../actions/actionValues'

const initialState = {
  grumbs: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GRUMBS:
      return {...state, grumbs: action.payload}
    default:
      return state
  }
}