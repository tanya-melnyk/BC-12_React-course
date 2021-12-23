// import { createReducer } from '@reduxjs/toolkit';
// import { setTutors, addTutor } from './tutorsActions';

// const tutorsReducer = createReducer([], builder => {
//   builder
//     .addCase(setTutors, (_, action) => action.payload)
//     .addCase(addTutor, (state, action) => [...state, action.payload]);
// });

// export default tutorsReducer;

/////////////////// with native thunks /////////////////////////

import { createReducer, combineReducers } from '@reduxjs/toolkit';
import * as tutorsActions from './tutorsActions';

const {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
} = tutorsActions;

const tutorsReducer = createReducer([], builder => {
  builder
    .addCase(getTutorsSuccess, (_, action) => action.payload)
    .addCase(addTutorSuccess, (state, action) => [...state, action.payload]);
});

const loadingReducer = createReducer(false, builder => {
  builder
    .addCase(getTutorsRequest, () => true)
    .addCase(getTutorsSuccess, () => false)
    .addCase(getTutorsError, () => false)

    .addCase(addTutorRequest, () => true)
    .addCase(addTutorSuccess, () => false)
    .addCase(addTutorError, () => false);
});

const errorReducer = createReducer(null, builder => {
  builder
    .addCase(getTutorsRequest, () => null)
    .addCase(getTutorsError, (_, action) => action.payload)

    .addCase(addTutorRequest, () => null)
    .addCase(addTutorError, (_, action) => action.payload);
});

// const controllerReducer = createReducer(
//   { controller: new AbortController() },
//   builder => {
//     builder
//       .addCase(getTutorsRequest, (_, action) => ({
//         controller: action.payload,
//       }))
//       .addCase(addTutorRequest, (_, action) => ({
//         controller: action.payload,
//       }));
//   },
// );

export default combineReducers({
  items: tutorsReducer,
  loading: loadingReducer,
  error: errorReducer,
  // controller: controllerReducer,
});
