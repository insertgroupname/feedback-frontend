import * as actionTypes from '../constants/analyticsContants';
import { axiosInstance } from 'src/utils/axiosInstance';

export const getAnalytics = (tag) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ANALYTIC_REQUEST
    });
    const { data } = await axiosInstance.get(
      `record/report/analytic/?tag=${tag}`
    );
    console.log(`record/report/analytic/?tag=${tag}`);
    dispatch({
      type: actionTypes.GET_ANALYTIC_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ANALYTIC_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getAllBaseline = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_BASELINE_REQUEST
    });
    const { data } = await axiosInstance.get(`analytic/avgstat`);
    dispatch({
      type: actionTypes.GET_ALL_BASELINE_SUCCESS,
      payload: data[0]
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_BASELINE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
