import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./actionCreators";
import { RegisterStatus } from "./enums";

const initialState = {
  login: "",
  password: "",
  repeatPassword: "",
  error: null,
  registerStatus: RegisterStatus.PENDING,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = RegisterStatus.PENDING;
        state.data = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = RegisterStatus.FULFILLED;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = RegisterStatus.REJECTED;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
