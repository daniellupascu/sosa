import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Button
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { fetchProducts } from "../../store/actions/product";
import Colors from "../../constants/constants";

const ProductsOverviewScreen = props => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const products = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    const initiateProductLoad = async () => {
      setIsDataLoading(true);
      await loadProducts();
      setIsDataLoading(false);
    };
    initiateProductLoad();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts);
    return () => unsubscribe();
  }, [loadProducts]);

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };

  const listProduct = ({ item }) => {
    const productActions = [
      {
        title: "View Details",
        onPress: () => {
          props.navigation.navigate("ProductDetails", { item });
        }
      },
      {
        title: "Add To Cart",
        onPress: () => addItemToCart(item)
      }
    ];
    return (
      <ProductItem
        onItemPress={() => {
          props.navigation.navigate("ProductDetails", { item });
        }}
        item={item}
        actionButtons={productActions}
      />
    );
  };

  if (error)
    return (
      <View style={styles.loader}>
        <Text>{error}</Text>
        <Button
          title={"Try again"}
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );

  if (isDataLoading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );

  if (!isDataLoading && !products.length)
    return (
      <View style={styles.loader}>
        <Text>No products found!</Text>
      </View>
    );
  return (
    <FlatList
      keyExtractor={item => item.id}
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={listProduct}
    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export const productsOverviewNavOptions = ({ navigation }) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navigation.push("CartOverview")}
        />
      </HeaderButtons>
    ),
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

export default ProductsOverviewScreen;
