import { createAction } from '@reduxjs/toolkit';

const getTutorsRequest = createAction('tutors/getTutors/pending');
const getTutorsSuccess = createAction('tutors/getTutors/fulfilled');
const getTutorsError = createAction('tutors/getTutors/rejected');

const addTutorRequest = createAction('tutors/addTutor/pending');
const addTutorSuccess = createAction('tutors/addTutor/fulfilled');
const addTutorError = createAction('tutors/addTutor/rejected');

export {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
};
