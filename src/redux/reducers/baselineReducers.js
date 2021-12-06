import * as actionTypes from '../constants/baselineConstants';

const initialBaselineState = {
  isLoading: false,
  baseline: {}
};

export const baselineReducer = (state = initialBaselineState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEM_DETAIL_BASELINE_REQUEST:
      return {
        isLoading: true,
        baseline: {}
      };

    case actionTypes.GET_ITEM_DETAIL_BASELINE_SUCCESS:
      return {
        isLoading: false,
        baseline: action.payload
      };

    case actionTypes.GET_ITEM_DETAIL_BASELINE_FAILURE:
      return {
        isLoading: false,
        error: action.payload
      };

    case actionTypes.UPDATE_ITEM_DETAIL_BASELINE_REQUEST:
      return {
        isLoading: true,
        baseline: state.baseline
      };

    case actionTypes.UPDATE_ITEM_DETAIL_BASELINE_SUCCESS:
      return {
        isLoading: false,
        baseline: action.payload
      };

    case actionTypes.UPDATE_ITEM_DETAIL_BASELINE_FAILURE:
      return {
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
