import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "ADD_ORDER";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://sosa-shop.firebaseio.com/orders/${userId}.json`,
        {
          method: "GET"
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const orders = [];

      for (const orderId in data) {
        const { date, items, total } = data[orderId];
        orders.push(new Order(orderId, new Date(date), items, total));
      }
      dispatch({ type: SET_ORDERS, orders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (items, total) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://sosa-shop.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items, total, date: date.toISOString() })
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: ADD_ORDER, id: resData.name, date, items, total });
  };
};
