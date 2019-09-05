import { combineReducers } from "redux";
import users from "./users";
import auth from "./auth";
import errors from "./error";
import login from "./login";

const rootReducer = combineReducers({
  users,
  auth,
  errors,
  login
});
export default rootReducer;
