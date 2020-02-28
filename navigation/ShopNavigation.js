import React from "react";
import { Platform, View, SafeAreaView, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import ProductsOverviewScreen, {
  productsOverviewNavOptions
} from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/constants";
import ProductDetailScreen, {
  productsDetailsNavOptions
} from "../screens/shop/ProductDetailScreen";
import CartScreen, { cartNavOptions } from "../screens/shop/CartScreen";
import OrdersScreen, { ordersNavOptions } from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  userProductsNavOptions
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  editProductNavOptions
} from "../screens/user/EditProductScreen";
import AuthScreen, { authNavOptions } from "../screens/user/AuthScreen";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white"
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  //   for iOS
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.accent
};

const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name={"ProductsOverview"}
        component={ProductsOverviewScreen}
        options={productsOverviewNavOptions}
      />
      <ProductsStackNavigator.Screen
        name={"ProductDetails"}
        component={ProductDetailScreen}
        options={productsDetailsNavOptions}
      />
      <ProductsStackNavigator.Screen
        name={"CartOverview"}
        component={CartScreen}
        options={cartNavOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen
        name={"Orders"}
        component={OrdersScreen}
        options={ordersNavOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen
        name={"UserProducts"}
        component={UserProductsScreen}
        options={userProductsNavOptions}
      />
      <AdminStackNavigator.Screen
        name={"EditProduct"}
        component={EditProductScreen}
        options={editProductNavOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();
export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      screenOptions={defaultNavigationOptions}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingVertical: 30 }}>
            <SafeAreaView forceInset={{ top: "aloways", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(logout());
                  // no longer needed because we do this in the navigation container
                  // props.navigation.navigate("Auth");
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShopDrawerNavigator.Screen
        name={"Products"}
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ms-list"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name={"Orders"}
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ms-cart"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name={"Admin"}
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ms-create"}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name={"Auth"}
        component={AuthScreen}
        options={authNavOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
