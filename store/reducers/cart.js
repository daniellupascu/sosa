import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  total: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      if (state.items[action.productId]) {
        const updatedItems = { ...state.items };
        delete updatedItems[action.productId];
        const newTotal = state.total - state.items[action.productId].sum;
        return { ...state, items: updatedItems, total: newTotal };
      }
      return state;
    case ADD_TO_CART:
      const { product } = action;

      let cartItem;

      if (state.items[product.id]) {
        const currentProduct = state.items[product.id];
        cartItem = new CartItem(
          currentProduct.quantity + 1,
          currentProduct.price,
          currentProduct.title,
          currentProduct.sum + currentProduct.price
        );
      } else {
        cartItem = new CartItem(1, product.price, product.title, product.price);
      }
      return {
        ...state,
        items: { ...state.items, [product.id]: cartItem },
        total: state.total + product.price
      };
    case REMOVE_FROM_CART:
      let newCart = { ...state.items };
      let itemCost = state.items[action.productId].sum;
      delete newCart[action.productId];
      return { ...state, items: newCart, total: state.total - itemCost };
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};
