import React, { useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Colors from "../constants/constants";
import { useDispatch } from "react-redux";
import { authenticate, setDidTryAutoLogin } from "../store/actions/auth";

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));
      if (!userData) {
        dispatch(setDidTryAutoLogin());
      } else {
        let { token, userId, expirationDate } = userData;
        expirationDate = new Date(expirationDate);
        if (expirationDate <= new Date() || !token || !userId) {
          dispatch(setDidTryAutoLogin());
        }
        const expirationTime = expirationDate.getTime() - new Date().getTime();
        dispatch(authenticate(userId, token, expirationTime));
      }
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
