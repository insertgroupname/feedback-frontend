import * as actionTypes from '../constants/authConstants';
import { axiosInstance } from 'src/utils/axiosInstance';
import Cookies from 'js-cookie';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST
    });

    const { data } = await axiosInstance.post(`login`, {
      email: email,
      password: password
    });

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const logout = () => async (dispatch) => {
  Cookies.remove('jwt');
  dispatch({
    type: actionTypes.LOGOUT
  });
};

export const resetLogin = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_RESET
  });
};

export const register = (email, password, username) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.REGISTER_REQUEST
    });

    const { data } = await axiosInstance.post(`register`, {
      email: email,
      password: password,
      username: username
    });

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const resetRegister = () => async (dispatch) => {
  dispatch({
    type: actionTypes.REGISTER_RESET
  });
};
