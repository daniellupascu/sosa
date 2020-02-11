import React, { useReducer, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return { ...state, isValid: action.isValid, value: action.value };
    case INPUT_BLUR:
      return { ...state, touched: true };
    default:
      return state;
  }
};

const Input = props => {
  const {
    id,
    label,
    onTextChange,
    initialValue,
    initiallyValid,
    required,
    email,
    min,
    max,
    minLength
  } = props;
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid,
    touched: false
  });

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  const onInputBlur = () => {
    dispatch({ type: INPUT_BLUR });
  };

  useEffect(() => {
    if (inputState.touched) {
      onTextChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onTextChange, id]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={onInputBlur}
      />
      {!inputState.isValid && (
        <Text>
          Please enter a valid <Text>{label}</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { width: "100%" },
  label: { fontFamily: "open-sans-bold", marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default Input;
