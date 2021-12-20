import { createReducer } from '@reduxjs/toolkit';
import * as actions from './departments-actions';

const { setDepartments, addDepartment, editDepartment, removeDepartment } =
  actions;

const departments = createReducer([], {
  [setDepartments]: (_, { payload }) => payload,
  [addDepartment]: (state, { payload }) => [...state, payload],
  [editDepartment]: (state, { payload }) =>
    state.map(department =>
      department.id === payload.id ? payload : department,
    ),
  [removeDepartment]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

export default departments;
