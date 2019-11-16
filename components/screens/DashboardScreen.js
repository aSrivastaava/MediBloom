import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import AppNavigator from "../../navigation/AppNavigator";

class DashboardScreen extends Component {
  render() {
    return <AppNavigator />;
  }
}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
