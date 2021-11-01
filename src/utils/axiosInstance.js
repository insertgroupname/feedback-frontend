import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3331/'
  baseURL: 'http://10.4.56.44:81/api/v1/'
});
