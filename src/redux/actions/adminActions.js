import * as actionTypes from '../constants/adminConstants';
import { axiosInstance } from 'src/utils/axiosInstance';

export const getAllBaseline = (tag) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ADMIN_REQUEST
    });
    const { data } = await axiosInstance.get(`admin/allAvg`);
    dispatch({
      type: actionTypes.GET_ADMIN_SUCCESS,
      payload: data.reverse()
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ADMIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
