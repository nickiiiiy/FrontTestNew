import {
  UPDATE_ERROR,
  UPDATE_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_REPEAT_PASSWORD,
  CLEAR_ERROR,
} from "./actions";
import { RegisterStatus } from "./enums";

const initialState = {
  login: "",
  password: "",
  repeatPassword: "",
  error: null,
  registerStatus: RegisterStatus.PENDING,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN:
      return { ...state, login: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_REPEAT_PASSWORD:
      return { ...state, repeatPassword: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case UPDATE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default registerReducer;
