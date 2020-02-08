import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Button
} from "react-native";

import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = props => {
  const item = props.navigation.getParam("item");
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.productContainer}>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <CustomButton
        title="Add to Cart"
        style={styles.button}
        onPress={() => dispatch(addToCart(item))}
      />
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productContainer: {},
  image: {
    height: 300,
    width: "100%"
  },
  button: {
    alignItems: "center",
    margin: 20
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 25,
    fontFamily: "open-sans"
  }
});

ProductDetailScreen.navigationOptions = navData => {
  return { headerTitle: navData.navigation.getParam("item").title };
};

export default ProductDetailScreen;
