import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  username: "",
  password: "",
  error: null,
  loginStatus: "pending",
};

export const loginUser = createAsyncThunk(
  "authorization/loginUser",
  async (params) => {
    try {
      const { data } = await axios.post("/user/login", params);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "fulfilled";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.error = action.payload;
      });
  },
});

export const { updateUsername, updatePassword, clearError, updateError } =
  authorizationSlice.actions;
export default authorizationSlice.reducer;
