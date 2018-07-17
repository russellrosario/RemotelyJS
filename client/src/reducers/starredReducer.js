import { FETCH_STARRED } from '../actions/types'

export default function (state = null, action) {
    
  switch (action.type) {
    case FETCH_STARRED:
      return action.payload || false;
    
    default:
      return state
  }
}