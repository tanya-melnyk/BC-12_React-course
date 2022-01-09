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
import storage from 'redux-persist/lib/storage';
import citiesReducer from './cities/citiesSlice';
import departmentsReducer from './departments/departmentsReducer';
import tutorsReducer from './tutors/tutorsReducer';
import { customMiddlewareLogger } from './middlewear/logger';

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
//       error: null,
//     },
//     filter: '',
//   },
//   departments: {
//     items: [],
//     loading: false,
//     error: null,
//   },
// };

const persistCitiesConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    cities: persistReducer(persistCitiesConfig, citiesReducer),
    departments: departmentsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(customMiddlewareLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };

//
//
//
//
//
//
//
//
//
//
//
//
//
//

////////////////////////////////////////////////////////////////////////

///   LESSON 15 final

// import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import authReducer from './auth/authSlice';
// import citiesReducer from './cities/citiesSlice';
// import departmentsReducer from './departments/departmentsReducer';
// import tutorsReducer from './tutors/tutorsReducer';
// import { customMiddlewareLogger } from './middlewear/logger';

// const persistCitiesConfig = {
//   key: 'filter',
//   storage,
//   whitelist: ['filter'],
// };

// const authPersistConfig = {
//   key: 'token',
//   storage,
//   whitelist: ['token', 'refreshToken'],
// };

// const store = configureStore({
//   reducer: {
//     auth: persistReducer(authPersistConfig, authReducer),
//     tutors: tutorsReducer,
//     cities: persistReducer(persistCitiesConfig, citiesReducer),
//     departments: departmentsReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(customMiddlewareLogger),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// const persistor = persistStore(store);

// export { store, persistor };
