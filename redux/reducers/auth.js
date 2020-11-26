const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    token: null,
    error: '',
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case "LOGIN":
      return {...state, user: payload.user, isAuthenticated: true, token: payload.token};
  case "LOGOUT":
      return {...state, user: null, isAuthenticated: false, token: null};
    default:
      return state;
  case "UPDATE_ACTIVITIES":
      return {...state, user: {...state.user, activities: payload.activities}};
  }
};

export default authReducer;
