import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const items = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    setCities: (_, { payload }) => payload,
    addCity: (state, { payload }) => {
      state.push(payload); // mutate the state all you want with immer
    },
    editCity: (state, { payload }) => {
      const idx = state.findIndex(({ id }) => id === payload.id);
      state[idx].name = payload.name;
    },
    removeCity: (state, { payload }) => {
      const idx = state.findIndex(({ id }) => id === payload.id);
      state.splice(idx, 1);
    },
  },
});

const filter = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter: (_, { payload }) => payload,
  },
});

export const { setCities, addCity, editCity, removeCity } = items.actions;
export const { changeFilter } = filter.actions;

export default combineReducers({
  items: items.reducer,
  filter: filter.reducer,
});
