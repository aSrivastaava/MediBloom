import React, { Component } from "react";
import {
  Dimensions,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Icon,
  Item,
  Input,
  Header,
  Content,
  Card,
  CardItem,
  Button,
  Body
} from "native-base";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Constants from "expo-constants";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import _ from "lodash";

const { width, height } = Dimensions.get("screen");

const inventory = require("../assets/chemistInventory.json");

class searchMed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      dataSource: inventory.stock,
      inMemory: inventory.stock,
      isLoading: false
    };
  }

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignContent: "center",
          width: width
        }}
      >
        <Card>
          <CardItem>
            <Text style={{ flex: 1, justifyContent: "center", fontSize: 26 }}>
              {item.term}
            </Text>
          </CardItem>
          <CardItem style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>
              Available at:  
            </Text>
              <Text>
                 {item.avail}, {item.avail_2}
                </Text>
          </CardItem>
        </Card>
      </View>
    );
  };

  searchMedicine = value => {
    const filterMedicine = this.state.inMemory.filter(stock => {
      let stockLowercase = stock.term.toLowerCase();
      let searchTermLowercase = value.toLowerCase();

      return stockLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ dataSource: filterMedicine });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchMedicine(text)}
        autoCorrect={false}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large"></ActivityIndicator>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          onChangeText={text => this.searchMedicine(text)}
          style={{
            backgroundColor: "#2f363c",
            height: 50,
            fontSize: 36,
            padding: 5,
            color: "white"
          }}
        />
        <SafeAreaView style={styles.flatList}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `list-item-${index}`}
            ListFooterComponent={this.renderFooter}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default searchMed;
searchMed.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  flatList: {
    flex: 1
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
