import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import {
  UPDATE_ERROR,
  UPDATE_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_REPEAT_PASSWORD,
} from "./actions";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (params, { dispatch }) => {
    try {
      const { data } = await axios.post("/user/registration", params);
      return data;
    } catch (error) {
      dispatch({ type: UPDATE_ERROR, payload: error.response.data });
      throw error.response.data;
    }
  }
);

export const updateLogin = (login) => ({ type: UPDATE_LOGIN, payload: login });
export const updatePassword = (password) => ({
  type: UPDATE_PASSWORD,
  payload: password,
});
export const updateRepeatPassword = (repeatPassword) => ({
  type: UPDATE_REPEAT_PASSWORD,
  payload: repeatPassword,
});
export const clearError = () => ({ type: CLEAR_ERROR });
