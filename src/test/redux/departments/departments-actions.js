import { createAction } from '@reduxjs/toolkit';

const setDepartments = createAction('departments/set');
const addDepartment = createAction('departments/add');
const editDepartment = createAction('departments/edit');
const removeDepartment = createAction('departments/remove');

export { setDepartments, addDepartment, editDepartment, removeDepartment };
