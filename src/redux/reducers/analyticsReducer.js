import * as actionTypes from '../constants/analyticsContants';

const initialState = {
  analytics: {},
  baselines: {},
  isLoading: false,
  isBaselineLoading: false
};

export const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ANALYTIC_REQUEST:
      return {
        analytics: state.analytics,
        baselines: state.baselines,
        isLoading: true,
        isBaselineLoading: false
      };

    case actionTypes.GET_ANALYTIC_SUCCESS:
      return {
        analytics: action.payload,
        baselines: state.baselines,
        isLoading: false,
        isBaselineLoading: false
      };

    case actionTypes.GET_ANALYTIC_FAILURE:
      return {
        error: action.payload,
        isLoading: false,
        isBaselineLoading: false
      };

    case actionTypes.GET_ALL_BASELINE_REQUEST:
      return {
        analytics: state.analytics,
        baselines: state.baselines,
        isLoading: false,
        isBaselineLoading: true
      };

    case actionTypes.GET_ALL_BASELINE_SUCCESS:
      return {
        analytics: state.analytics,
        baselines: action.payload,
        isLoading: false,
        isBaselineLoading: false
      };

    case actionTypes.GET_ALL_BASELINE_FAILURE:
      return {
        error: action.payload,
        isBaselineLoading: false
      };

    default:
      return state;
  }
};
