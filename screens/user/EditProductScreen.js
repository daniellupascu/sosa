import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../store/actions/product";
import Input from "../../components/UI/Input";
import Colors from "../../constants/constants";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let formIsValid = true;
    for (const key in updatedValidities) {
      formIsValid = formIsValid && updatedValidities[key];
    }

    return {
      formIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
  return state;
};

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const itemToEdit = props.route.params ? props.route.params.item : null;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: itemToEdit ? itemToEdit.title : "",
      imageUrl: itemToEdit ? itemToEdit.imageUrl : "",
      description: itemToEdit ? itemToEdit.description : "",
      price: ""
    },
    inputValidities: {
      title: itemToEdit ? true : false,
      imageUrl: itemToEdit ? true : false,
      description: itemToEdit ? true : false,
      price: itemToEdit ? true : false
    },
    formIsValid: itemToEdit ? true : false
  });

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert(
        "Oops!",
        "Please make sure that all the values in the form are valid"
      );
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (itemToEdit) {
        await dispatch(
          updateProduct({
            id: itemToEdit.id,
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description
          })
        );
      } else {
        await dispatch(
          createProduct({
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            price: +formState.inputValues.price,
            description: formState.inputValues.description
          })
        );
      }
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
    props.navigation.goBack();
  }, [dispatch, itemToEdit, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: itemToEdit ? `Edit ${itemToEdit.title}` : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save Item"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler, itemToEdit]);

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }
  }, [error]);

  const textChangeHandler = useCallback(
    (input, text, isValid) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: text,
        isValid,
        input
      });
    },
    [dispatchFormState]
  );

  if (isLoading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label={"Title"}
            initialValue={formState.inputValues.title}
            initiallyValid={!!itemToEdit}
            onTextChange={textChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          <Input
            id="imageUrl"
            label={"Image URL"}
            initialValue={formState.inputValues.imageUrl}
            initiallyValid={!!itemToEdit}
            onTextChange={textChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
          />
          {!itemToEdit && (
            <Input
              id="price"
              label={"Price"}
              onTextChange={textChangeHandler}
              keyboardType="decimal-pad"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
            />
          )}
          <Input
            id="description"
            label={"Description"}
            initialValue={formState.inputValues.description}
            initiallyValid={!!itemToEdit}
            onTextChange={textChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: {},
  form: { margin: 20 },
  formElement: { width: "100%" },
  label: { fontFamily: "open-sans-bold", marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export const editProductNavOptions = navData => {
  return {};
};

export default EditProductScreen;
