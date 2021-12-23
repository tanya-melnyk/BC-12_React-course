/////////////////// with native thunks /////////////////////

import { getData, saveItem } from 'services/api';
import * as tutorsActions from './tutorsActions';

const {
  getTutorsRequest,
  getTutorsSuccess,
  getTutorsError,
  addTutorRequest,
  addTutorSuccess,
  addTutorError,
} = tutorsActions;

const API_ENDPOINT = 'tutors';

const getTutors = () => async dispatch => {
  dispatch(getTutorsRequest());
  try {
    const tutors = await getData(API_ENDPOINT);
    dispatch(getTutorsSuccess(tutors));
  } catch (error) {
    dispatch(getTutorsError(error.message));
  }
};

const addTutor = tutor => async dispatch => {
  dispatch(addTutorRequest());
  try {
    const newTutor = await saveItem(API_ENDPOINT, tutor);
    dispatch(addTutorSuccess(newTutor));
  } catch (error) {
    dispatch(addTutorError(error.message));
  }
};

export { getTutors, addTutor };

/////////////////// with createAsyncThunk /////////////////////

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import * as api from 'services/api-service';

// const API_ENDPOINT = 'tutors';

// const fetchTutors = createAsyncThunk('tutors/fetchStatus', (_, { signal }) =>
//   api.getData(API_ENDPOINT, { signal }),
// );

// const addTutor = createAsyncThunk(
//   'tutors/addTutorStatus',
//   (tutor, { signal }) => api.saveItem(API_ENDPOINT, tutor, { signal }),
// );

// export { fetchTutors, addTutor };
