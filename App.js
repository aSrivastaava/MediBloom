import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
// import MediBloom from "./app/index";

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
    const imageAssets = cacheImages([require("./assets/bg2.jpg")]);

    await Promise.all([...imageAssets]);
  }

  render() {
    //This if statement checks if the app is ready or not
    // if ready then return the app if not then shows loading.

    // if (!this.state.isReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadAssetsAsync}
    //       onFinish={() => this.setState({ isReady: true })}
    //       onError={console.warn}
    //     />
    //   );
    // }
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
