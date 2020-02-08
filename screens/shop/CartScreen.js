import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/constants";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector(state => {
    const itemsArray = [];
    for (const key in state.cart.items) {
      itemsArray.push({ id: key, ...state.cart.items[key] });
    }
    return itemsArray;
  });

  const allProducts = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const cartTotalAmount = useSelector(state => state.cart.total);
  const renderCartItem = ({ item }) => {
    const product = allProducts.find(p => p.id === item.id);
    return (
      <CartItem
        item={{
          ...item,
          imageUrl: product.imageUrl
        }}
        onViewDetail={() => {
          props.navigation.navigate("ProductDetails", { item: product });
        }}
        onRemoveFromCart={() => dispatch(removeFromCart(item.id))}
      />
    );
  };

  const placeOrder = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.text}>
          Total{" "}
          <Text style={styles.total}>
            ${Math.round((cartTotalAmount.toFixed(2) * 100) / 100)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <Button
            title="Order now"
            color={Colors.accent}
            onPress={placeOrder}
            disabled={cartItems.length === 0}
          />
        )}
      </View>
      <FlatList
        style={styles.list}
        data={cartItems}
        renderItem={renderCartItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: {},
  summary: {
    // paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "10%"
    // shadowColor: "black",
    // shadowOpacity: 0.36,
    // shadowOffset: { width: 0, height: 2 },
    // elevation: 3,
    // borderRadius: 10,
    // overflow: "hidden"
  },
  text: { fontFamily: "open-sans-bold", fontSize: 18 },
  total: {
    color: Colors.primary
  },
  list: {
    height: "90%"
    // paddingBottom: 20
  }
});

CartScreen.navigationOptions = {
  headerTitle: "Cart"
};

export default CartScreen;
