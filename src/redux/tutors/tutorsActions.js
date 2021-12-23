import { createAction } from '@reduxjs/toolkit';

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
