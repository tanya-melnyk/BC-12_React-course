// import { createStore, combineReducers } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';
// import citiesReducer from './cities/citiesReducer';
// import tutorsReducer from './tutors/tutorsReducer';

// const rootReducer = combineReducers({
//   tutors: tutorsReducer,
//   cities: citiesReducer,
//   departments: () => [],
// });

// const store = createStore(rootReducer, devToolsEnhancer());

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import logger from 'redux-logger';
import citiesReducer from './cities/citiesReducer';
import tutorsReducer from './tutors/tutorsReducer';

const persistConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger);

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    cities: persistReducer(persistConfig, citiesReducer),
    departments: () => [],
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
