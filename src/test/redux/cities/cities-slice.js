// import { createSlice, combineReducers } from '@reduxjs/toolkit';

// const itemsSlice = createSlice({
//   name: 'items',
//   initialState: [],
//   reducers: {
//     setCities: (_, { payload }) => payload,

//     addCity: (state, { payload }) => [...state, payload],

//     editCity: (state, { payload }) =>
//       state.map(city => (city.id === payload.id ? payload : city)),

//     deleteCity: (state, { payload }) =>
//       state.filter(city => city.id !== payload),
//   },
// });

// const filterSlice = createSlice({
//   name: 'filter',
//   initialState: '',
//   reducers: {
//     changeFilter: (_, { payload }) => payload,
//   },
// });

// export const { setCities, addCity, editCity, deleteCity } = itemsSlice.actions;
// export const { changeFilter } = itemsSlice.actions;

// const citiesReducer = combineReducers({
//   items: itemsSlice.reducer,
//   filter: filterSlice.reducer,
// });

// export default citiesReducer;

/////////////////////////////////////////////////////////

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: '',
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, { payload }) => {
      state.items = payload;
    },

    addCity: (state, { payload }) => {
      state.items.push(payload);
    },

    editCity: (state, { payload }) => {
      const idx = state.items.findIndex(city => city.id === payload.id);
      state.items[idx] = payload;
    },

    deleteCity: (state, { payload }) => {
      const idx = state.items.findIndex(({ id }) => id === payload);
      state.items.splice(idx, 1);
    },

    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { setCities, addCity, editCity, deleteCity, changeFilter } =
  citiesSlice.actions;

export default citiesSlice.reducer;
