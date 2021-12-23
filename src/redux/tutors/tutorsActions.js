import { createAction } from '@reduxjs/toolkit';

const setTutors = createAction('tutors/set');
const addTutor = createAction('tutors/tutor_add');

export { setTutors, addTutor };
