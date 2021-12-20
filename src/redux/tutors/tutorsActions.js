import TYPES from './tutorsTypes';

const setTutors = tutors => ({
  type: TYPES.SET,
  payload: tutors,
});

const addTutor = tutor => ({
  type: TYPES.ADD,
  payload: tutor,
});

export { setTutors, addTutor };
