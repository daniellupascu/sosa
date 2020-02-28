import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import Input from "../../components/UI/Input";
import Colors from "../../constants/constants";
import { useDispatch } from "react-redux";
import { signup, login } from "../../store/actions/auth";

const AuthScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigninIn, setIsSigningIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onFormUpdate = (input, text, isValid) => {
    if (isValid) {
      if (input === "email") setEmail(text);
      if (input === "password") setPassword(text);
    }
  };

  const dispatch = useDispatch();

  const onFormSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(
        isSigninIn ? login(email, password) : signup(email, password)
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <View style={styles.formContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            onTextChange={onFormUpdate}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={6}
            autoCapitalize="none"
            onTextChange={onFormUpdate}
            initialValue=""
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttons}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <Button
                title={isSigninIn ? "login" : "sign up"}
                onPress={onFormSubmit}
                color={Colors.primary}
              />
            )}
            <Text onPress={() => setIsSigningIn(!isSigninIn)}>
              Switch to {isSigninIn ? "sign up" : "sign in"}
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export const authNavOptions = ({ navigation }) => {
  return {
    headerTitle: "sosa - fashion in the pocket "
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    width: "90%"
  },
  error: {
    color: "red"
  },
  buttons: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default AuthScreen;
