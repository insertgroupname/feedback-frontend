import * as actionTypes from '../constants/itemsConstants';

const initialItemState = {
  items: [],
  isLoading: false
};

const initialItemDetailState = {
  item: {},
  streaming: null,
  videoRequired: false,
  isLoading: false
};

export const itemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEM_REQUEST:
      return {
        items: state.items,
        isLoading: true
      };

    case actionTypes.GET_ITEM_SUCCESS:
      return {
        items: action.payload,
        isLoading: false
      };

    case actionTypes.GET_ITEM_FAILURE:
      return {
        items: state.items,
        isLoading: false,
        error: action.payload
      };

    case actionTypes.ADD_ITEM_SUCCESS: {
      const item = action.payload;
      return {
        items: state.items.concat(item)
      };
    }

    case actionTypes.ADD_ITEM_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.UPDATE_ITEM_SUCCESS: {
      const item = action.payload;
      const index = state.items.findIndex(
        (prevItem) => prevItem.videoUUID === item.videoUUID
      );
      const updatedItem = state.items;
      updatedItem[index].videoName = item.videoName;
      updatedItem[index].description = item.description;
      updatedItem[index].tags = item.tags;
      updatedItem[index].lastUpdate = new Date();
      return {
        items: updatedItem
      };
    }

    case actionTypes.UPDATE_ITEM_FAILURE:
      return {
        error: action.payload
      };

    case actionTypes.DELETE_ITEM_SUCCESS: {
      const videoUUID = action.payload;
      return {
        items: state.items.filter((item) => item.videoUUID !== videoUUID)
      };
    }

    case actionTypes.DELETE_ITEM_FAILURE:
      return {
        error: action.payload
      };

    default:
      return state;
  }
};

export const itemDetailReducer = (state = initialItemDetailState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEM_DETAIL_REQUEST:
      return {
        isLoading: true,
        streaming: null,
        videoRequired: false,
        item: {}
      };
    case actionTypes.GET_ITEM_DETAIL_SUCCESS:
      return {
        item: action.payload.videoDetailData,
        streaming: action.payload.streamData,
        videoRequired: true,
        isLoading: false
      };

    case actionTypes.GET_ITEM_DETAIL_FAILURE:
      return {
        isLoading: false,
        videoRequired: false,
        streaming: null,
        error: action.payload
      };

    case actionTypes.ITEM_DETAIL_RESET:
      return {
        item: {},
        videoRequired: false,
        streaming: null,
        isLoading: false
      };

    default:
      return state;
  }
};
