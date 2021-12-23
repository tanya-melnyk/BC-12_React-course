import { combineReducers } from 'redux';
import TYPES from './tutorsTypes';

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.GET_SUCCESS:
      return action.payload;

    case TYPES.ADD_REQUEST:
      return [...state, action.payload];

    default:
      return state;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.GET_REQUEST:
      return true;
    case TYPES.GET_SUCCESS:
      return false;
    case TYPES.GET_ERROR:
      return false;

    case TYPES.ADD_REQUEST:
      return true;
    case TYPES.ADD_SUCCESS:
      return false;
    case TYPES.ADD_ERROR:
      return false;

    default:
      return state;
  }
};

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.GET_REQUEST:
      return null;
    case TYPES.GET_ERROR:
      return action.payload;

    case TYPES.ADD_REQUEST:
      return null;
    case TYPES.ADD_ERROR:
      return action.payload;

    default:
      return state;
  }
};

const tutorsReducer = combineReducers({
  items: itemsReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default tutorsReducer;
