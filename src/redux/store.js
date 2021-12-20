import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import citiesReducer from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';

// {
//   tutors: [],
//   cities: {
//     items: [],
//     filter: '',
//   },
//   departments: [],
// }

const rootReducer = combineReducers({
  tutors: tutorsReducer,
  departments: () => [],
  cities: citiesReducer,
});

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
