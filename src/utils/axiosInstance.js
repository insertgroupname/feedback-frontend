import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt');

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
