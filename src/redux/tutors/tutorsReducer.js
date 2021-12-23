import { createReducer } from '@reduxjs/toolkit';
import { setTutors, addTutor } from './tutorsActions';

// ИСПОЛЬЗУЯ КОЛБЕК builder

const tutorsReducer = createReducer([], builder => {
  builder
    .addCase(setTutors, (_, action) => action.payload)
    .addCase(addTutor, (state, action) => [...state, action.payload]);
});

// ИСПОЛЬЗУЯ ОБЪЕКТ С ПОЛЯМИ-ТИПАМИ ACTIONS

// const tutorsReducer = createReducer([], {
//   [setTutors]: (_, action) => action.payload,
//   [addTutor]: (state, action) => [...state, action.payload],
// });

export default tutorsReducer;
