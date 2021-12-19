import types from './tutorsTypes';

const setTutors = tutors => ({
  type: types.SET,
  payload: tutors,
});

const addTutor = tutor => ({
  type: types.ADD,
  payload: tutor,
});

export { setTutors, addTutor };