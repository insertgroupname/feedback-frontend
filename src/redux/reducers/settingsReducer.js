import * as actionTypes from '../constants/settingsConstants';

const initialSettingState = {
  stopwords: [],
  tags: [],
  isLoading: false
};

export const settingsReducer = (state = initialSettingState, action) => {
  switch (action.type) {
    case actionTypes.GET_SETTINGS_REQUEST:
      return {
        stopwords: state.stopwords,
        tags: state.tags,
        isLoading: true
      };

    case actionTypes.GET_SETTINGS_SUCCESS:
      const stopwords = action.payload.stopwords;
      const tags = action.payload.tags;
      return {
        stopwords: stopwords,
        tags: tags,
        isLoading: false
      };

    case actionTypes.GET_SETTINGS_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.ADD_STOPWORD_SUCCESS: {
      const newStopwords = action.payload;
      return {
        stopwords: newStopwords,
        tags: state.tags
      };
    }

    case actionTypes.ADD_STOPWORD_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.ADD_TAG_SUCCESS: {
      const newTags = action.payload;
      return {
        stopwords: state.stopwords,
        tags: newTags
      };
    }

    case actionTypes.ADD_TAG_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.DELETE_STOPWORD_SUCCESS: {
      const updatedStopwords = action.payload;
      return {
        stopwords: updatedStopwords,
        tags: state.tags
      };
    }

    case actionTypes.DELETE_STOPWORD_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.DELETE_TAG_SUCCESS: {
      const updatedTags = action.payload;
      return {
        stopwords: state.stopwords,
        tags: updatedTags
      };
    }

    case actionTypes.DELETE_TAG_FAILURE:
      return {
        error: action.payload
      };

    default:
      return state;
  }
};
