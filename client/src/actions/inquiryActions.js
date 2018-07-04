import axios from 'axios';

import { GET_ERRORS } from './types';

export const submitInquiry = (inquiryData, history) => dispatch => {
  axios
    .post('/api/inquiry/submit', inquiryData)
    .then(res => history.push('/response'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};