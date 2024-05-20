import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import authorizationReducer from "./slices/authorizationSlice"; // Добавьте эту строку

export const store = configureStore({
  reducer: {
    register: registerReducer,
    authorization: authorizationReducer, // И эту строку
  },
});

export default store;
