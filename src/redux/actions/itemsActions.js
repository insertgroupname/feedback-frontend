import * as actionTypes from '../constants/itemsConstants';
import { axiosInstance } from 'src/utils/axiosInstance';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt');

export const getItems = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ITEM_REQUEST
    });
    const { data } = await axiosInstance.get(`record/landing/`);
    dispatch({
      type: actionTypes.GET_ITEM_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const addItem = (item) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post(`upload`, item, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    dispatch({
      type: actionTypes.ADD_ITEM_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateItem = (item) => async (dispatch) => {
  try {
    await axiosInstance.patch(`record/report/${item.videoUUID}`, item);
    dispatch({
      type: actionTypes.UPDATE_ITEM_SUCCESS,
      payload: item
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteItem = (videoUUID) => async (dispatch) => {
  try {
    await axiosInstance.delete(`record/report/${videoUUID}`);
    dispatch({
      type: actionTypes.DELETE_ITEM_SUCCESS,
      payload: videoUUID
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_ITEM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getItemDetail = (videoUUID) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_REQUEST
    });
    const { data: videoDetailData } = await axiosInstance.get(
      `record/report/${videoUUID}`
    );
    const result = await fetch(
      `http://10.4.56.44:81/api/v2/record/streaming/${videoUUID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    );
    const blob = await result.blob();
    const streamData = URL.createObjectURL(blob);
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_SUCCESS,
      payload: {
        videoDetailData,
        streamData
      }
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const resetItem = () => async (dispatch) => {
  dispatch({
    type: actionTypes.ITEM_DETAIL_RESET
  });
};
