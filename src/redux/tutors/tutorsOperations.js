import { getData, saveItem } from 'services/api';
import {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
} from './tutorsActions';

const API_ENDPOINT = 'tutors';

const getTutors = () => async dispatch => {
  dispatch(getTutorsRequest());
  try {
    const tutors = await getData(API_ENDPOINT);
    // const data = await getData(API_ENDPOINT);
    // const tutors = Object.keys(data || {}).map(id => ({ id, ...data[id] }));
    dispatch(getTutorsSuccess(tutors));
  } catch (error) {
    dispatch(getTutorsError(error.message));
  }
};

const addTutor = newTutor => async dispatch => {
  dispatch(addTutorRequest());
  try {
    const savedTutor = await saveItem(API_ENDPOINT, newTutor);
    // const data = await saveItem(API_ENDPOINT, newTutor);
    // const savedTutor = { id: data.name, ...newTutor };
    dispatch(addTutorSuccess(savedTutor));
  } catch (error) {
    dispatch(addTutorError(error.message));
  }
};

export { getTutors, addTutor };

//
//
//
//
//
//
//
//
//
//
//
//
//

///////////////////////////////////////////////////////////////

///   LESSON 15 final

// import { getData, saveItem } from 'services/api';
// import {
//   getTutorsRequest,
//   getTutorsSuccess,
//   getTutorsError,
//   addTutorRequest,
//   addTutorSuccess,
//   addTutorError,
// } from './tutorsActions';

// const API_ENDPOINT = 'tutors';

// const getTutors = () => async (dispatch, getState) => {
//   dispatch(getTutorsRequest());
//   try {
//     const { localId } = getState().auth;
//     const data = await getData(`${localId}/${API_ENDPOINT}`);
//     const tutors = Object.keys(data || {}).map(id => ({ id, ...data[id] }));
//     dispatch(getTutorsSuccess(tutors));
//   } catch (error) {
//     dispatch(getTutorsError(error.message));
//   }
// };

// const addTutor = newTutor => async (dispatch, getState) => {
//   dispatch(addTutorRequest());
//   try {
//     const { localId } = getState().auth;
//     const data = await saveItem(`${localId}/${API_ENDPOINT}`, newTutor);
//     const savedTutor = { id: data.name, ...newTutor };
//     dispatch(addTutorSuccess(savedTutor));
//   } catch (error) {
//     dispatch(addTutorError(error.message));
//   }
// };

// export { getTutors, addTutor };
