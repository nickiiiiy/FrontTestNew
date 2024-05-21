import axios from "../../axios";

export const startAuthUser = () => {
  return {
    type: "AUTH_USER",
  };
};

export const authSuccess = (payload) => {
  return {
    type: "AUTH_USER_SUCCESS",
    payload,
  };
};

export const authError = (error) => {
  return {
    type: "AUTH_USER_ERROR",
    error,
  };
};
