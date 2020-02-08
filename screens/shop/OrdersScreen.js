import React, { useCallback, useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Platform,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/order";
import Colors from "../../constants/constants";

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  const renderOrderItem = ({ item: order }) => {
    return <OrderItem order={order} />;
  };

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, loadOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", loadOrders);
    return () => willFocus.remove();
  }, [loadOrders]);

  if (isLoading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.loader}>
        <Text>{error}</Text>
      </View>
    );

  return (
    <View>
      <FlatList data={orders} renderItem={renderOrderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" }
});

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

export default OrdersScreen;
