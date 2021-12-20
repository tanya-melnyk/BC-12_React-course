import types from './citiesTypes';

const setCities = cities => ({
  type: types.SET,
  payload: cities,
});

const addCity = city => ({
  type: types.ADD,
  payload: city,
});

const editCity = city => ({
  type: types.EDIT,
  payload: city,
});

const removeCity = id => ({
  type: types.REMOVE,
  payload: id,
});

const changeFilter = value => ({
  type: types.FILTER,
  payload: value,
});

export { setCities, addCity, editCity, removeCity, changeFilter };
