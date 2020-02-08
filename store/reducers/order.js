import { ADD_ORDER, SET_ORDERS } from "../actions/order";
import Order from "../../models/order";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    case ADD_ORDER:
      const newOrder = new Order(
        action.id,
        action.date,
        action.items,
        action.total
      );
      const newState = state.orders.concat(newOrder);
      return { ...state, orders: newState };
    default:
      return state;
  }
};
