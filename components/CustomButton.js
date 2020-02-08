import React from "react";
import { View, Button } from "react-native";

import Colors from "../constants/constants";

const CustomButton = ({ title, onPress, style }) => {
  return (
    <View style={{ ...style }}>
      <Button color={Colors.primary} title={title} onPress={onPress} />
    </View>
  );
};

export default CustomButton;
