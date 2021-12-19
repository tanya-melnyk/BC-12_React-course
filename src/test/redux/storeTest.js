import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import citiesReducer from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';

const rootReducer = combineReducers({
  tutors: tutorsReducer,
  cities: citiesReducer,
  departments: () => [],
});

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
