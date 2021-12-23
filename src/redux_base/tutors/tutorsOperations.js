import { getData, saveItem } from 'services/api';
import * as tutorsActions from './tutorsActions';

const API_ENDPOINT = 'tutors';

const {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
} = tutorsActions;

const getTutors = () => dispatch => {
  dispatch(getTutorsRequest());
  getData(API_ENDPOINT)
    .then(tutors => dispatch(getTutorsSuccess(tutors)))
    .catch(err => dispatch(getTutorsError(err.message)));
};

const addTutor = tutor => dispatch => {
  dispatch(addTutorRequest());
  saveItem(API_ENDPOINT, tutor)
    .then(newTutor => dispatch(addTutorSuccess(newTutor)))
    .catch(err => dispatch(addTutorError(err.message)));
};

export { getTutors, addTutor };
