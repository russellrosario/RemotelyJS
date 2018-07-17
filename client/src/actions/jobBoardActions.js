import axios from 'axios';


import { FETCH_JOBS, COUNT_JOBS, FETCH_TAGGED_JOBS, FETCH_STARRED } from './types';


export const fetchJobs = (page,show) => async dispatch => {
    const res = await axios.get(`/api/jobs/list?page=${page}&show=${show}`);
  
    dispatch({ type: FETCH_JOBS, payload: res.data });
};
  
export const jobCount = () => async dispatch => {
    const res = await axios.get('/api/jobs/count');
  
    dispatch({ type: COUNT_JOBS, payload: res.data });
};

export const fetchTaggedJobs = (tag,page,show) => async dispatch => {
    const res = await axios.get(`/api/jobs/match/${tag}?page=${page}&show=${show}`);
  
    dispatch({ type: FETCH_TAGGED_JOBS, payload: res.data });
};

export const fetchStarred = () => async dispatch => {
  const starred = await axios.get('/api/users/starred');
  dispatch({ type: FETCH_STARRED, payload: starred.data });
}