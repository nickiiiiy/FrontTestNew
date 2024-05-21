import { combineReducers } from "redux";
import { registerReducer } from "./register";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  registration: registerReducer,
  auth: authReducer,
});

export default rootReducer;
