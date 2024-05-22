// actions/user.js
export const startLoginUser = (payload) => {
  return {
    type: "LOGIN",
    payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: "LOGIN_SUCCESS",
    payload,
  };
};

export const loginError = (error) => {
  return {
    type: "LOGIN_ERROR",
    error,
  };
};

// reducers/user.js
const initialState = {
  error: null,
  user: null,
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        error: null,
        isAuth: true,
        user: action.payload,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

// action-creators/user.js
export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(startLoginUser());

      const response = await loginUserService(userData);

      dispatch(loginSuccess(response.data));
    } catch (error) {
      const errorText = error.response.data;

      dispatch(loginError(errorText.message));
    }
  };
};
