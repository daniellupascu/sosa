import React, { useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Colors from "../constants/constants";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/actions/auth";

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      if (!userData) {
        props.navigation.navigate("Auth");
      }
      let { token, userId, expirationDate } = userData;
      expirationDate = new Date(expirationDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
      }
      props.navigation.navigate("ShopDrawerNavigator");
      dispatch(authenticate(userId, token));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StartupScreen;
