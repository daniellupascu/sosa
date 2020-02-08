import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback
} from "react-native";
import CustomButton from "../CustomButton";

const ProductItem = ({ item, onItemPress, actionButtons }) => {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Touchable onPress={onItemPress}>
      <View style={styles.item}>
        <Image style={styles.image} source={{ uri: item.imageUrl }} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        {actionButtons && (
          <View style={styles.buttonsContainer}>
            {actionButtons.map((button, i) => (
              <CustomButton
                key={i}
                title={button.title}
                onPress={button.onPress}
              />
            ))}
          </View>
        )}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    height: 320,
    margin: 20
  },
  image: { width: "100%", height: "60%" },
  details: { alignItems: "center", height: "15%", padding: 10 },
  title: { fontSize: 18, marginVertical: 4, fontFamily: "open-sans-bold" },
  price: { fontSize: 14, fontFamily: "open-sans" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "25%"
  }
});

export default ProductItem;
