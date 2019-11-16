import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import firebase from "firebase";
import { ExpoConfigView } from "@expo/samples";

class SettingScreen extends Component {
  render() {
    var displayName;
    var user = firebase.auth().currentUser;
    function disp() {
      if (user.displayName != null) {
        displayName = user.displayName;
      } else {
        displayName = user.email;
      }
      return displayName;
    }
    return <ExpoConfigView />;
  }
}
export default SettingScreen;

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
