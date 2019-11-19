import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../components/screens/HomeScreen";
import NearByScreen from "../components/screens/NearByScreen";
import SettingsScreen from "../components/screens/SettingsScreen";
import searchMed from "../assets/searchMed";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

HomeStack.path = "";

const NearByStack = createStackNavigator(
  {
    NearBy: NearByScreen
  },
  config
);

NearByStack.navigationOptions = {
  tabBarLabel: "NearBy",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

NearByStack.path = "";

const SearchMedStack = createStackNavigator(
  {
    SearchMed: searchMed
  },
  config
);

SearchMedStack.navigationOptions = {
  tabBarLabel: "Search Medicine",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  )
};

SearchMedStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  NearByStack,
  SearchMedStack,
  SettingsStack
});
tabNavigator.path = "";

export default tabNavigator;
