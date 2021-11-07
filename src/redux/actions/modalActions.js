import * as actionTypes from '../constants/modalConstants';

export const openUploadModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_UPLOAD_MODAL
  });
};

export const openEditModal = (videoUUID) => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_EDIT_MODAL,
    videoUUID: videoUUID
  });
};

export const openConfirmModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_CONFIRM_MODAL
  });
};

export const openUploadSuccessModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_UPLOAD_SUCCESS_MODAL
  });
};

export const openUploadFailModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_UPLOAD_FAIL_MODAL
  });
};

export const openEditSuccessModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_EDIT_SUCCESS_MODAL
  });
};

export const openEditFailModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_EDIT_FAIL_MODAL
  });
};

export const openDeleteSuccessModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_DELETE_SUCCESS_MODAL
  });
};

export const openDeleteFailModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.OPEN_DELETE_FAIL_MODAL
  });
};

export const closeUploadModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_UPLOAD_MODAL
  });
};

export const closeEditModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_EDIT_MODAL
  });
};

export const closeConfirmModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_CONFIRM_MODAL
  });
};

export const closeSuccessFailModal = () => async (dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_SUCCESS_FAIL_MODAL
  });
};
