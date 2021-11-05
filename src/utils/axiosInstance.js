import axios from 'axios';
import store from '../redux/store';

const state = store.getState();
const token = state.authentication.token;

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v2/',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }

  // baseURL: 'http://10.4.56.44:81/api/v1/'
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
