import * as actionTypes from '../constants/itemsConstants';
import { axiosInstance } from 'src/utils/axiosInstance';

export const getItems = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ITEM_REQUEST
    });
    const { data } = await axiosInstance.get(`records/${userId}`);
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
      payload: {
        ...data
      }
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

export const updateItem = (data) => async (dispatch) => {
  try {
    console.log(data);
    dispatch({
      type: actionTypes.UPDATE_ITEM_SUCCESS,
      payload: data
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
    console.log('deleted video', videoUUID);
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

export const getItemDetail = (userId, videoUUID) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_REQUEST
    });
    const { data } = await axiosInstance.get(`records/${userId}/${videoUUID}`);
    dispatch({
      type: actionTypes.GET_ITEM_DETAIL_SUCCESS,
      payload: data[0]
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
