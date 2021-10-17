import * as actionTypes from '../constants/itemsConstants';

const initialItemState = {
  items: []
};

const initialItemDetailState = {
  item: {}
};

export const itemReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEM_REQUEST:
      return {
        isLoading: true,
        items: []
      };

    case actionTypes.GET_ITEM_SUCCESS:
      return {
        items: action.payload,
        isLoading: false
      };

    case actionTypes.GET_ITEM_FAILURE:
      return {
        isLoading: false,
        error: action.payload
      };

    case actionTypes.ADD_ITEM_SUCCESS:
      const item = action.payload;
      return {
        ...state,
        items: [item, ...state.items]
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
        item: {}
      };
    case actionTypes.GET_ITEM_DETAIL_SUCCESS:
      return {
        item: action.payload,
        isLoading: false
      };

    case actionTypes.GET_ITEM_DETAIL_FAILURE:
      return {
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
