import * as actionTypes from '../constants/authConstants';
import Cookies from 'js-cookie';

const initialToken = Cookies.get('jwt');

const initialState = {
  token: initialToken,
  isAuthenticated: false,
  userId: null,
  isLoading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        userId: action.payload.userId,
        error: null
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.LOGIN_RESET:
      return {};

    case actionTypes.LOGOUT:
      return {};

    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isRegistration: false,
        error: null
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        token: action.payload.token,
        userId: action.payload.userId,
        isLoading: false,
        isRegistration: true,
        error: null
      };

    case actionTypes.REGISTER_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.REGISTER_RESET:
      return {};

    case actionTypes.VERIFY_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        isRegistration: false,
        error: null
      };

    case actionTypes.VERIFY_TOKEN_SUCCESS:
      return {
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
        isRegistration: false,
        userId: action.payload.userId,
        error: null
      };

    case actionTypes.VERIFY_TOKEN_FAILURE:
      return {
        error: action.payload
      };

    default:
      return state;
  }
};
