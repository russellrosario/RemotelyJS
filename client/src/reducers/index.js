import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer';
import jobBoardReducer from './jobBoardReducer';
import jobCountReducer from './jobCountReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  jobs: jobBoardReducer,
  count: jobCountReducer
})