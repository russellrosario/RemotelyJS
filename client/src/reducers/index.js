import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer';
import jobBoardReducer from './jobBoardReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  jobs: jobBoardReducer
})