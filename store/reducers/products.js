import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from "../actions/product";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(p => p.ownerId == "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter(p => p.ownerId == "u1")
      };
    case CREATE_PRODUCT:
      const { details } = action;
      const newProduct = new Product(
        details.id,
        "u1",
        details.title,
        details.imageUrl,
        details.description,
        details.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT: {
      const { details } = action;
      const productIndex = state.userProducts.findIndex(
        p => p.id === details.id
      );
      const updatedProduct = new Product(
        details.id,
        state.userProducts[productIndex].ownerId,
        details.title,
        details.imageUrl,
        details.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        p => p.id === details.id
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    }

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(p => p.id !== action.productId),
        availableProducts: state.availableProducts.filter(
          p => p.id !== action.productId
        )
      };
    default:
      return state;
  }
};
