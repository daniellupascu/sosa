import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { deleteProduct } from "../../store/actions/product";

const UserProductsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const userProducts = useSelector(state => state.products.userProducts);

  const dispatch = useDispatch();

  const deleteProductHandler = item => {
    Alert.alert(item.title, "Are you sure you want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          await dispatch(deleteProduct(item.id));
          setIsLoading(false);
        }
      }
    ]);
  };

  const renderUserProduct = ({ item }) => {
    const productActions = [
      {
        title: "Edit",
        onPress: () => props.navigation.push("EditProduct", { item })
      },
      { title: "Delete", onPress: () => deleteProductHandler(item) }
    ];
    return (
      <ProductItem
        onItemPress={() => props.navigation.push("EditProduct", { item })}
        item={item}
        actionButtons={productActions}
      />
    );
  };

  if (isLoading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View style={styles.screen}>
      <FlatList data={userProducts} renderItem={renderUserProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: {}
});

export const userProductsNavOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Item"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => navigation.push("EditProduct")}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
