import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoadingScreen from "./components/screens/LoadingScreen";
import LoginScreen from "./components/screens/LoginScreen";
import DashboardScreen from "./components/screens/DashboardScreen";

import * as firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

//Cache Image method

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/images/bg2.jpg")]);

    await Promise.all([
      ...imageAssets,
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      })
    ]);
  }

  render() {
    // This if statement checks if the app is ready or not
    // if ready then return the app if not then shows loading.

    if (!this.state.isReady) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isReady: true })}
          startAsync={this._loadAssetsAsync}
          onError={console.warn}
        />
      );
    }
    return <AppNavigator />;
  }
}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
