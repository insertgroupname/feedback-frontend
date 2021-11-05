import * as actionTypes from '../constants/authConstants';
import Cookies from 'js-cookie';

const initialToken = Cookies.get('jwt');

const initialState = {
  isAuthenticated: !!initialToken,
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
        isLoading: false,
        isAuthenticated: true,
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
        isAuthenticated: false,
        error: null
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: true,
        error: null
      };

    case actionTypes.REGISTER_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.REGISTER_RESET:
      return {};

    default:
      return state;
  }
};
