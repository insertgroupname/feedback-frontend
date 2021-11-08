import * as actionTypes from '../constants/settingsConstants';
import { axiosInstance } from 'src/utils/axiosInstance';

export const getSettings = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_SETTINGS_REQUEST
    });
    const { data } = await axiosInstance.get(`user/data`);

    console.log(data);

    dispatch({
      type: actionTypes.GET_SETTINGS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SETTINGS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const addStopword = (newStopwords) => async (dispatch) => {
  try {
    await axiosInstance.patch(`user/data/edit`, {
      stopwords: newStopwords
    });
    dispatch({
      type: actionTypes.ADD_STOPWORD_SUCCESS,
      payload: newStopwords
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_STOPWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const addTag = (newTags) => async (dispatch) => {
  try {
    await axiosInstance.patch(`user/data/edit`, {
      tags: newTags
    });
    dispatch({
      type: actionTypes.ADD_TAG_SUCCESS,
      payload: newTags
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TAG_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteStopword = (updatedStopwords) => async (dispatch) => {
  try {
    await axiosInstance.patch(`user/data/edit`, {
      stopwords: updatedStopwords
    });
    dispatch({
      type: actionTypes.DELETE_STOPWORD_SUCCESS,
      payload: updatedStopwords
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_STOPWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteTag = (updatedTags) => async (dispatch) => {
  await axiosInstance.patch(`user/data/edit`, {
    tags: updatedTags
  });
  try {
    dispatch({
      type: actionTypes.DELETE_TAG_SUCCESS,
      payload: updatedTags
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_TAG_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
