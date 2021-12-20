// import types from './tutorsTypes';

// const tutorsReducer = (state = [], action) => {
//   switch (action.type) {
//     case types.SET:
//       return action.payload;

//     case types.ADD:
//       return [...state, action.payload];

//     default:
//       return state;
//   }
// };

// export default tutorsReducer;

import { createReducer } from '@reduxjs/toolkit';
import { addTutor, setTutors } from './tutors-actions';

const tutorsReducer = createReducer([], builder => {
  builder
    .addCase(setTutors, (_, action) => action.payload)
    .addCase(addTutor, (state, action) => [...state, action.payload]);
});

// const tutorsReducer = createReducer([], {
//   [setTutors]: (_, action) => action.payload,
//   [addTutor]: (state, action) => [...state, action.payload],
// });

export default tutorsReducer;
