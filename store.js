import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    // Добавьте другие редюсеры здесь, если у вас их больше одного
  },
});