import * as actionTypes from '../constants/authConstants';
import { axiosInstance } from 'src/utils/axiosInstance';
import Cookies from 'js-cookie';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGIN_REQUEST
    });

    const { data } = await axiosInstance.post(
      `signin`,
      {
        email: email,
        password: password
      },
      {
        withCredentials: true
      }
    );

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.status
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

export const register =
  (email, password, firstName, lastName) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.REGISTER_REQUEST
      });

      const { data } = await axiosInstance.post(
        `register`,
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        },
        {
          withCredentials: true
        }
      );

      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.REGISTER_FAILURE,
        payload:
          error.response && error.response.data
            ? error.response.data
            : error.status
      });
    }
  };

export const resetRegister = () => async (dispatch) => {
  dispatch({
    type: actionTypes.REGISTER_RESET
  });
};

export const verifyToken = (token) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.VERIFY_TOKEN_REQUEST
    });
    const verifyTokenUrl = `verifyToken?token=${token}`;
    const { data } = await axiosInstance.get(verifyTokenUrl);
    dispatch({
      type: actionTypes.VERIFY_TOKEN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.VERIFY_TOKEN_FAILURE,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.status
    });
  }
};
