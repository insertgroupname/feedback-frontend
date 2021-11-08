import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

//Reducers
import { authReducer } from './reducers/authReducer';
import { itemReducer, itemDetailReducer } from './reducers/itemsReducer';
import { modalReducer } from './reducers/modalReducer';
import { settingsReducer } from './reducers/settingsReducer';

const loggerMiddleware = createLogger();

const reducer = combineReducers({
  authentication: authReducer,
  items: itemReducer,
  itemDetail: itemDetailReducer,
  modal: modalReducer,
  settings: settingsReducer
});

const middleware = [thunk, loggerMiddleware];

const INITIAL_STATE = {};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
