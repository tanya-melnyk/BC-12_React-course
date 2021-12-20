// import types from './tutorsTypes';

// const setTutors = tutors => ({
//   type: types.SET,
//   payload: tutors,
// });

// const addTutor = tutor => ({
//   type: types.ADD,
//   payload: tutor,
// });

// export { setTutors, addTutor };

import { createAction } from '@reduxjs/toolkit';

const setTutors = createAction('tutors/set');
const addTutor = createAction('tutors/add');

export { setTutors, addTutor };
