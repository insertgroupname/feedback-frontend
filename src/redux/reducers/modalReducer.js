import * as actionTypes from '../constants/modalConstants';

const initialModalState = {
  showUploadModal: false,
  showEditModal: false,
  showConfirmModal: false,
  showUploadSuccessModal: false,
  showUploadFailModal: false,
  showEditSuccessModal: false,
  showEditFailModal: false,
  showDeleteSuccessModal: false,
  showDeleteFailModal: false,
  showUpdateSuccessModal: false,
  showUpdateFailModal: false,
  videoUUID: null
};

export const modalReducer = (state = initialModalState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_UPLOAD_MODAL:
      return {
        ...state,
        showUploadModal: true
      };

    case actionTypes.OPEN_EDIT_MODAL:
      return {
        ...state,
        showEditModal: true,
        videoUUID: action.videoUUID
      };

    case actionTypes.OPEN_CONFIRM_MODAL:
      return {
        ...state,
        showConfirmModal: true
      };

    case actionTypes.OPEN_UPLOAD_SUCCESS_MODAL: {
      return {
        ...state,
        showUploadSuccessModal: true
      };
    }

    case actionTypes.OPEN_UPLOAD_FAIL_MODAL: {
      return {
        ...state,
        showUploadFailModal: true
      };
    }

    case actionTypes.OPEN_EDIT_SUCCESS_MODAL: {
      return {
        ...state,
        showEditSuccessModal: true
      };
    }

    case actionTypes.OPEN_EDIT_FAIL_MODAL: {
      return {
        ...state,
        showEditFailModal: true
      };
    }

    case actionTypes.OPEN_DELETE_SUCCESS_MODAL: {
      return {
        ...state,
        showDeleteSuccessModal: true
      };
    }

    case actionTypes.OPEN_DELETE_FAIL_MODAL: {
      return {
        ...state,
        showDeleteFailModal: true
      };
    }

    case actionTypes.OPEN_UPDATE_BASELINE_SUCCESS_MODAL: {
      return {
        ...state,
        showUpdateSuccessModal: true
      };
    }

    case actionTypes.OPEN_UPDATE_BASELINE_FAIL_MODAL: {
      return {
        ...state,
        showUpdateFailModal: true
      };
    }

    case actionTypes.CLOSE_UPLOAD_MODAL:
      return {
        ...state,
        showUploadModal: false
      };

    case actionTypes.CLOSE_EDIT_MODAL: {
      return {
        ...state,
        showEditModal: false,
        videoUUID: null
      };
    }

    case actionTypes.CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        showConfirmModal: false
      };

    case actionTypes.CLOSE_UPDATE_BASELINE_SUCCESS_MODAL: {
      return {
        ...state,
        showUpdateSuccessModal: false
      };
    }

    case actionTypes.CLOSE_UPDATE_BASELINE_FAIL_MODAL: {
      return {
        ...state,
        showUpdateFailModal: false
      };
    }

    case actionTypes.CLOSE_SUCCESS_FAIL_MODAL: {
      return {
        ...state,
        showUploadSuccessModal: false,
        showUploadFailModal: false,
        showEditSuccessModal: false,
        showEditFailModal: false,
        showDeleteSuccessModal: false,
        showDeleteFailModal: false
      };
    }
    default:
      return state;
  }
};
