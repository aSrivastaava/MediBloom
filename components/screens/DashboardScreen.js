import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as firebase from "firebase";

class DashboardScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textField}>DashboardScreen</Text>
        <Button
          title="SignOut"
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(function() {
                // Sign-out successful.
              })
              .catch(function(error) {
                // An error happened.
              });
          }}
        />
      </View>
    );
  }
}
export default DashboardScreen;

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
