import TYPES from './tutorsTypes';

const getTutorsRequest = () => ({
  type: TYPES.GET_REQUEST,
});
const getTutorsSuccess = tutors => ({
  type: TYPES.GET_SUCCESS,
  payload: tutors,
});
const getTutorsError = error => ({
  type: TYPES.GET_ERROR,
  payload: error,
});

const addTutorRequest = () => ({
  type: TYPES.ADD_REQUEST,
});
const addTutorSuccess = tutor => ({
  type: TYPES.ADD_SUCCESS,
  payload: tutor,
});
const addTutorError = error => ({
  type: TYPES.ADD_ERROR,
  payload: error,
});

export {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
};
