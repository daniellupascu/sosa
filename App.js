import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./fonts/OpenSans-Regular.ttf")
  });
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  if (!isFontLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
      />
    );
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
