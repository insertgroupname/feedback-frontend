import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt');

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:81/api/v2/',
  withCredentials: true
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
