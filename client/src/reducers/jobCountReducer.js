import { COUNT_JOBS } from '../actions/types'

export default function (state = null, action) {
    
  switch (action.type) {
    case COUNT_JOBS:
      return action.payload || false;
    default:
      return state
  }
}
