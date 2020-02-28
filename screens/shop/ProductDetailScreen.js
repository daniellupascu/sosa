import React from "react";
import { StyleSheet, ScrollView, Text, Image } from "react-native";

import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = props => {
  const item = props.route.params ? props.route.params.item : null;

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

export const productsDetailsNavOptions = navData => {
  return { headerTitle: navData.route.params.item.title };
};

export default ProductDetailScreen;
