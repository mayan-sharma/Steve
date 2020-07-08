import axios from "axios";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_LOADING,
} from "./types";

// let URL = "http://localhost:8000/api/products";
let URL = "/api/products";

export const getProducts = () => (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  axios.get(URL + "/").then((res) =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    })
  );
};

export const getProduct = (id) => (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  axios.get(URL + `/${id}`).then((res) => {
    dispatch({ type: GET_PRODUCT, payload: res.data.product });
  });
};

export const addProduct = (product) => (dispatch) => {
  axios.post(URL + "/", product).then((res) =>
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    })
  );
};

export const deleteProduct = (id) => (dispatch) => {
  axios.delete(URL + "/").then((res) =>
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    })
  );
};
