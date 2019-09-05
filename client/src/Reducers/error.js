const initialState = {};
const errorReducers = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ERRORS":
      return action.payload;

    default:
      break;
  }
  return state;
};
export default errorReducers;
