const initialState = {
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_USER":
      return { ...state, loading: true, error: null };
    case "AUTH_USER_SUCCESS":
      return { ...state, loading: false, error: null };
    case "AUTH_USER_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
