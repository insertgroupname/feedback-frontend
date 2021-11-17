import * as actionTypes from '../constants/adminConstants';

const initialState = {
  admin: [],
  isLoading: false
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_REQUEST:
      return {
        admin: state.admin,
        isLoading: true
      };
    case actionTypes.GET_ADMIN_SUCCESS:
      return {
        admin: action.payload,
        isLoading: false
      };

    case actionTypes.GET_ADMIN_FAILURE:
      return {
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};
