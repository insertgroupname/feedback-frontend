import * as actionTypes from '../constants/itemsConstants';

const initialItemState = {
  items: [],
  isLoading: false
};

const initialItemDetailState = {
  item: {},
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

    case actionTypes.ADD_ITEM_SUCCESS:
      const item = action.payload;
      return {
        items: item
      };

    case actionTypes.ADD_ITEM_FAILURE:
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
        videoRequired: false,
        item: {}
      };
    case actionTypes.GET_ITEM_DETAIL_SUCCESS:
      return {
        item: action.payload,
        videoRequired: true,
        isLoading: false
      };

    case actionTypes.GET_ITEM_DETAIL_FAILURE:
      return {
        isLoading: false,
        videoRequired: false,
        error: action.payload
      };

    case actionTypes.ITEM_DETAIL_RESET:
      return {
        item: {},
        videoRequired: false,
        isLoading: false
      };

    default:
      return state;
  }
};
