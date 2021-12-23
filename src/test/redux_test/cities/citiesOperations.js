import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'services/api';

const API_ENDPOINT = 'cities';

const getCities = createAsyncThunk('cities/getCitiesStatus', () =>
  api.getData(API_ENDPOINT),
);

const addCity = createAsyncThunk('cities/addCityStatus', city =>
  api.saveItem(API_ENDPOINT, city),
);

const editCity = createAsyncThunk('cities/editCityStatus', updatedCity =>
  api.editItem(API_ENDPOINT, updatedCity),
);

const removeCity = createAsyncThunk('cities/removeCityStatus', id =>
  api.deleteItem(API_ENDPOINT, id),
);

export { getCities, addCity, editCity, removeCity };
