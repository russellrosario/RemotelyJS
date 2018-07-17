import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import jobBoardReducer from './jobBoardReducer';
import jobCountReducer from './jobCountReducer';
import jobBoardTaggedReducer from './jobBoardTaggedReducer';
import starredReducer from './starredReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  jobs: jobBoardReducer,
  count: jobCountReducer,
  taggedJobs: jobBoardTaggedReducer,
  starred: starredReducer
});
