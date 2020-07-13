import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        state
      }
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        // ...action.payload,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
