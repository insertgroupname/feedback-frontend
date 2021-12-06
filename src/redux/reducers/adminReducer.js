import * as actionTypes from '../constants/adminConstants';

const initialState = {
  allUserBaseline: [],
  paceLength: [],
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

    case actionTypes.ADD_AVERAGE_PACE_LENGTH_REQUEST:
      return {
        allUserBaseline: state.allUserBaseline,
        paceLength: [],
        isLoading: true
      };

    case actionTypes.ADD_AVERAGE_PACE_LENGTH_SUCCESS:
      return {
        allUserBaseline: state.allUserBaseline,
        paceLength: action.payload,
        isLoading: false
      };

    case actionTypes.ADD_AVERAGE_PACE_LENGTH_FAILURE:
      return {
        allUserBaseline: state.allUserBaseline,
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
};
