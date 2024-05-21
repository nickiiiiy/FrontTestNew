export const authUser = (userData) => async (dispatch) => {
  try {
    dispatch(startAuthUser());
    const response = await axios.post("/user/login", userData);
    dispatch(authSuccess(response.data));
  } catch (error) {
    const errorText = error.response.data;
    dispatch(authError(errorText.message));
  }
};
