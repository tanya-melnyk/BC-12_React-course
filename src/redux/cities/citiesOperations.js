import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'services/api';

const API_ENDPOINT = 'cities';

const getCities = createAsyncThunk('cities/getCitiesStatus', async () => {
  const data = await api.getData(API_ENDPOINT);
  return Object.keys(data || {}).map(id => ({ id, ...data[id] }));
});

const addCity = createAsyncThunk('cities/addCityStatus', async newCity => {
  const data = await api.saveItem(API_ENDPOINT, newCity);
  return { id: data.name, ...newCity };
});

const editCity = createAsyncThunk('cities/editCityStatus', updatedCity =>
  api.editItem(API_ENDPOINT, updatedCity),
);

const deleteCity = createAsyncThunk('cities/deleteCityStatus', async id => {
  await api.deleteItem(API_ENDPOINT, id);
  return { id };
});

export { getCities, addCity, editCity, deleteCity };

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
//
//
//
//
//
//
//
//

///////////////////////////////////////////////////////////////////

///   LESSON 15 final

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import * as api from 'services/api';

// const API_ENDPOINT = 'cities';

// const getCities = createAsyncThunk(
//   'cities/getCitiesStatus',
//   async (_, { getState }) => {
//     const { localId } = getState().auth;
//     const data = await api.getData(`${localId}/${API_ENDPOINT}`);
//     return Object.keys(data || {}).map(id => ({ id, ...data[id] }));
//   },
// );

// const addCity = createAsyncThunk(
//   'cities/addCityStatus',
//   async (newCity, { getState }) => {
//     const { localId } = getState().auth;
//     const data = await api.saveItem(`${localId}/${API_ENDPOINT}`, newCity);
//     return { id: data.name, ...newCity };
//   },
// );

// const editCity = createAsyncThunk(
//   'cities/editCityStatus',
//   async (updatedCity, { getState }) => {
//     const { localId } = getState().auth;
//     return api.editItem(`${localId}/${API_ENDPOINT}`, updatedCity);
//   },
// );

// const deleteCity = createAsyncThunk(
//   'cities/deleteCityStatus',
//   async (id, { getState }) => {
//     const { localId } = getState().auth;
//     await api.deleteItem(`${localId}/${API_ENDPOINT}`, id);
//     return { id };
//   },
// );

// export { getCities, addCity, editCity, deleteCity };
