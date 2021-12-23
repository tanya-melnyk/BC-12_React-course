// import { createStore, combineReducers } from 'redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import citiesReducer from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';

import { customMiddlewareLogger, myMiddleware } from './middlewear/logger';

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

const middleware = [thunk, customMiddlewareLogger, myMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

// const store = createStore(rootReducer, devToolsEnhancer());

export default store;
