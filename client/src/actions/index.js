import axios from 'axios';
import { FETCH_USER, FETCH_JOBLISTINGS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitJobListing = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/jobListings', values);
    history.push('/jobListings');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    if (err.message.includes('403')) {
      alert('You need to add more credits!')
    }
  }
}


export const fetchJobListings = () => async dispatch => {
  const res = await axios.get('/api/jobListings');

  dispatch({ type: FETCH_JOBLISTINGS, payload: res.data });
};