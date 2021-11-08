import * as actionTypes from '../constants/settingsConstants';

const initialSettingState = {
  username: '',
  stopwords: [],
  tags: [],
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
      const tags = action.payload.tags;
      return {
        username: username,
        stopwords: stopwords,
        tags: tags,
        isLoading: false
      };

    case actionTypes.GET_SETTINGS_FAILURE:
      return {
        username: state.username,
        error: action.payload
      };

    case actionTypes.ADD_STOPWORD_SUCCESS: {
      const newStopwords = action.payload;
      return {
        username: state.username,
        stopwords: newStopwords,
        tags: state.tags
      };
    }

    case actionTypes.ADD_STOPWORD_FAILURE:
      return {
        username: state.username,
        error: action.payload
      };

    case actionTypes.ADD_TAG_SUCCESS: {
      const newTags = action.payload;
      return {
        username: state.username,
        stopwords: state.stopwords,
        tags: newTags
      };
    }

    case actionTypes.ADD_TAG_FAILURE:
      return {
        username: state.username,
        error: action.payload
      };

    case actionTypes.DELETE_STOPWORD_SUCCESS: {
      const updatedStopwords = action.payload;
      return {
        username: state.username,
        stopwords: updatedStopwords,
        tags: state.tags
      };
    }

    case actionTypes.DELETE_STOPWORD_FAILURE:
      return {
        username: state.username,
        error: action.payload
      };

    case actionTypes.DELETE_TAG_SUCCESS: {
      const updatedTags = action.payload;
      return {
        username: state.username,
        stopwords: state.stopwords,
        tags: updatedTags
      };
    }

    case actionTypes.DELETE_TAG_FAILURE:
      return {
        username: state.username,
        error: action.payload
      };

    default:
      return state;
  }
};
