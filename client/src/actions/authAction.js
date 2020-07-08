import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
} from "./types";

// let URL = "http://localhost:8000/api/user";
let URL = "/api/user";

// Loads user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get(URL + "/verify", tokenConfig(getState))
    .then((res) => {
      if (res.data === "Access Denied!")
        dispatch({ type: AUTH_ERROR, payload: res.data });
      else
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR, payload: err });
    });
};

//Register User
export const registerUser = ({ name, email, password }) => (dispatch) => {
  // Setup headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const reqBody = JSON.stringify({ name, email, password });

  axios
    .post(URL + "/register", reqBody, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      })
    );
};

//Login user
export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: USER_LOADING });
  // const reqBody = JSON.stringify({ email, password });
  // console.log(reqBody);
  axios
    .post(URL + "/login", { email: email, password: password })
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      // console.log(err);
    });
};

//Logout user
export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  // fetching token
  const token = getState().auth.token;

  // Puts token in header
  let config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
