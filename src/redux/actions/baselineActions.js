import * as actionTypes from '../constants/baselineConstants';
import { axiosInstance } from 'src/utils/axiosInstance';

export const getItemDetailBaseline = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_BASELINE_REQUEST
    });
    const { data } = await axiosInstance.get('baseline');
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_BASELINE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_BASELINE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateItemDetailBaseline = (baseline) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.UPDATE_ITEM_DETAIL_BASELINE_REQUEST
    });
    const { data } = await axiosInstance.post('admin/setBaseline', baseline);
    dispatch({
      type: actionTypes.UPDATE_ITEM_DETAIL_BASELINE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ITEM_DETAIL_BASELINE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
