import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Colors from "../../constants/constants";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

const OrderItem = ({ order }) => {
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const products = useSelector(state => state.products.availableProducts);
  return (
    <View style={styles.orderItem}>
      <View style={styles.orderInfo}>
        <View style={styles.summary}>
          <Text style={styles.amount}>${order.total}</Text>
          <Text style={styles.date}>{order.readableDate}</Text>
        </View>
        <View style={styles.button}>
          <Button
            color={Colors.primary}
            title={isShowingDetails ? "Hide details" : "Show Details"}
            onPress={() => setIsShowingDetails(!isShowingDetails)}
          />
        </View>
      </View>
      {isShowingDetails && (
        <View>
          {order.items.map(item => (
            <ProductItem
              key={item.id}
              item={products.find(p => p.id === item.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 150
  },
  amount: { fontSize: 16, fontFamily: "open-sans-bold" },
  date: { fontSize: 16, fontFamily: "open-sans" }
});

export default OrderItem;
