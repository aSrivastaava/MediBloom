import React, { Component } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import firebase from "firebase";
import { ExpoConfigView } from "@expo/samples";
import Set from "./set";


class SettingScreen extends Component {

  render() {
    // return <ExpoConfigView />;
    return <Set />
  }
}
export default SettingScreen;

SettingScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textField: {
    margin: "5%",
    fontSize: 25
  }
});