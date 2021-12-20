import { combineReducers } from 'redux';
import types from './citiesTypes';

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET:
      return action.payload;

    case types.ADD:
      return [...state, action.payload];

    case types.EDIT:
      return state.map(city =>
        city.id === action.payload.id ? action.payload : city,
      );

    case types.REMOVE:
      return state.filter(city => city.id !== action.payload);

    default:
      return state;
  }
};

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case types.FILTER:
      return action.payload;
    default:
      return state;
  }
};

const citiesReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export default citiesReducer;
