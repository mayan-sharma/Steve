import axios from "axios";
import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, CART_LOADING } from "./types";
import { tokenConfig } from "../actions/authAction";

// let URL = "http://localhost:8000/api/cart";
let URL = "/api/cart";

export const getCart = () => (dispatch, getState) => {
  dispatch({ type: CART_LOADING });
  axios
    .get(URL + "/display", tokenConfig(getState))
    .then((res) =>
      dispatch({ type: GET_CART, payload: res.data.cart.products })
    )
    .catch((err) => console.log(err));
};

export const addToCart = (id) => (dispatch, getState) => {
  axios
    .post(URL + `/${id}`, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_TO_CART, payload: res.data.product }))
    .catch((err) => console.log(err));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  axios
    .delete(URL + `/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({ type: REMOVE_FROM_CART, payload: res.data.product._id })
    )
    .catch((err) => console.log(err));
};
