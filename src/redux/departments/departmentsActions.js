import { types } from './departmentsTypes';

const actions = {
  getDepartmentsPending: () => ({
    type: types.GET_PENDING,
  }),
  getDepartmentsFulfilled: departments => ({
    type: types.GET_FULFILLED,
    payload: departments,
  }),
  getDepartmentsRejected: error => ({
    type: types.GET_REJECTED,
    payload: error,
  }),

  addDepartmentPending: () => ({
    type: types.ADD_PENDING,
  }),
  addDepartmentFulfilled: newDepartment => ({
    type: types.ADD_FULFILLED,
    payload: newDepartment,
  }),
  addDepartmentRejected: error => ({
    type: types.ADD_REJECTED,
    payload: error,
  }),

  editDepartmentPending: () => ({
    type: types.EDIT_PENDING,
  }),
  editDepartmentFulfilled: updatedDepartment => ({
    type: types.EDIT_FULFILLED,
    payload: updatedDepartment,
  }),
  editDepartmentRejected: error => ({
    type: types.EDIT_REJECTED,
    payload: error,
  }),

  deleteDepartmentPending: () => ({
    type: types.DELETE_PENDING,
  }),
  deleteDepartmentFulfilled: idToDelete => ({
    type: types.DELETE_FULFILLED,
    payload: idToDelete,
  }),
  deleteDepartmentRejected: error => ({
    type: types.DELETE_REJECTED,
    payload: error,
  }),
};

export { actions };
