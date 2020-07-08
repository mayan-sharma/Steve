import {
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_LOADING,
} from "../actions/types";

const initialState = {
  products: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };

    case ADD_TO_CART:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
