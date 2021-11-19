import * as actionTypes from '../constants/settingsConstants';

const initialSettingState = {
  username: '',
  stopwords: [],
  tags: [],
  type: null,
  isLoading: false
};

export const settingsReducer = (state = initialSettingState, action) => {
  switch (action.type) {
    case actionTypes.GET_SETTINGS_REQUEST:
      return {
        username: state.username,
        stopwords: state.stopwords,
        tags: state.tags,
        isLoading: true
      };

    case actionTypes.GET_SETTINGS_SUCCESS:
      const username = action.payload.username;
      const stopwords = action.payload.stopwords;
      const type = action.payload.type;
      const tags = action.payload.tags;
      return {
        username: username,
        stopwords: stopwords,
        type: type,
        tags: tags,
        isLoading: false
      };

    case actionTypes.GET_SETTINGS_FAILURE:
      return {
        username: state.username,
        error: action.payload,
        type: state.type
      };

    case actionTypes.ADD_STOPWORD_SUCCESS: {
      const newStopwords = action.payload;
      return {
        username: state.username,
        stopwords: newStopwords,
        tags: state.tags,
        type: state.type
      };
    }

    case actionTypes.ADD_STOPWORD_FAILURE:
      return {
        username: state.username,
        error: action.payload,
        type: state.type
      };

    case actionTypes.ADD_TAG_SUCCESS: {
      const newTags = action.payload;
      return {
        username: state.username,
        stopwords: state.stopwords,
        tags: newTags,
        type: state.type
      };
    }

    case actionTypes.ADD_TAG_FAILURE:
      return {
        username: state.username,
        error: action.payload,
        type: state.type
      };

    case actionTypes.DELETE_STOPWORD_SUCCESS: {
      const updatedStopwords = action.payload;
      return {
        username: state.username,
        stopwords: updatedStopwords,
        tags: state.tags,
        type: state.type
      };
    }

    case actionTypes.DELETE_STOPWORD_FAILURE:
      return {
        username: state.username,
        error: action.payload,
        type: state.type
      };

    case actionTypes.DELETE_TAG_SUCCESS: {
      const updatedTags = action.payload;
      return {
        username: state.username,
        stopwords: state.stopwords,
        tags: updatedTags,
        type: state.type
      };
    }

    case actionTypes.DELETE_TAG_FAILURE:
      return {
        username: state.username,
        error: action.payload,
        type: state.type
      };

    default:
      return state;
  }
};
