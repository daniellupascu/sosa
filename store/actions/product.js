import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://sosa-shop.firebaseio.com/products.json",
        {
          method: "GET"
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const products = [];

      for (const productId in data) {
        const { title, imageUrl, description, price } = data[productId];
        products.push(
          new Product(productId, "u1", title, imageUrl, description, price)
        );
      }
      dispatch({ type: SET_PRODUCTS, products });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://sosa-shop.firebaseio.com/products/${productId}.json`,
        {
          method: "DELETE"
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      dispatch({ type: DELETE_PRODUCT, productId });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = details => {
  return async dispatch => {
    const response = await fetch(
      "https://sosa-shop.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
      }
    );

    const data = await response.json();

    dispatch({ type: CREATE_PRODUCT, details: { ...details, id: data.name } });
  };
};

export const updateProduct = details => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://sosa-shop.firebaseio.com/products/${details.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            description: details.description,
            imageUrl: details.imageUrl,
            title: details.title
          })
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        details
      });
    } catch (err) {
      throw err;
    }
  };
};
