import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_LOADING,
} from "../actions/types";

const initialState = {
  products: [],
  activeProduct: null,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        activeProduct: null,
        isLoading: false,
      };

    case GET_PRODUCT:
      return {
        ...state,
        activeProduct: action.payload,
        isLoading: false,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
