import * as actionTypes from '../constants/adminConstants';

const initialState = {
  allUserBaseline: [],
  isLoading: false
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ADMIN_REQUEST:
      return {
        allUserBaseline: state.allUserBaseline,
        isLoading: true
      };
    case actionTypes.GET_ADMIN_SUCCESS:
      return {
        allUserBaseline: action.payload,
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
