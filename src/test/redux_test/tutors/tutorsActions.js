import { createAction } from '@reduxjs/toolkit';

const setTutors = createAction('tutors/set');
const addTutor = createAction('tutors/tutor_add');

export { setTutors, addTutor };

/////////////////// with native thunks /////////////////////////

// import { createAction } from '@reduxjs/toolkit';

const getTutorsRequest = createAction('tutors/getTutorsRequest');
const getTutorsSuccess = createAction('tutors/getTutorsSuccess');
const getTutorsError = createAction('tutors/getTutorsError');

const addTutorRequest = createAction('tutors/addTutorRequest');
const addTutorSuccess = createAction('tutors/addTutorSuccess');
const addTutorError = createAction('tutors/addTutorError');

export {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
};
