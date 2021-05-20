import { FETCH_USER } from './types';
import axios from '../utils/axios';
import catchAsync from '../utils/catchAsync';

export const signIn = (formProps, errorCallback) => (dispatch) => {
  catchAsync(async () => {
    const response = await axios.post('/users/login', formProps);
    const data = response.data.data;

    /*
     * Save token to local storage
     */
    localStorage.setItem('token', data.token);
    window.location.reload();
  }, errorCallback);
};

export const fetchUser = (callback) => (dispatch) => {
  catchAsync(
    async () => {
      const response = await axios.get('/users/current-user');
      const data = response.data.data;

      dispatch({
        type: FETCH_USER,
        payload: data.user,
      });
      callback();
    },
    () => {
      callback();
      localStorage.removeItem('token');
    }
  );
};

export const signOut = () => {
  window.location.href = '/';
  localStorage.removeItem('token');
};
