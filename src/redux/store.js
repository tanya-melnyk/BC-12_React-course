import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
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
import storage from 'redux-persist/lib/storage';
import citiesReducer from './cities/citiesSlice';
import tutorsReducer from './tutors/tutorsReducer';
// import { customMiddlewareLogger, myMiddleware } from './middlewear/logger';

///////  BEFORE ASYNC REDUX

// const state = {
//   tutors: [],
//   cities: {
//     items: [],
//     filter: '',
//   },
//   departments: [],
// }

///////  BEFORE ASYNC REDUX

// const state = {
//   tutors: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   cities: {
//     data: {
//       items: [],
//       loading: false,
//       error: null
//     },
//     filter: '',
//   },
//   departments: [],
// };

const persistCitiesConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
  timestamp: false,
});

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    cities: persistReducer(persistCitiesConfig, citiesReducer),
    departments: () => [],
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(myMiddleware)
      // .concat(customMiddlewareLogger)
      .concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
