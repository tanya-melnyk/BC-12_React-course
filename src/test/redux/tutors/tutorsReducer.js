import types from './tutorsTypes';

const tutorsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET:
      return action.payload;

    case types.ADD:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default tutorsReducer;
