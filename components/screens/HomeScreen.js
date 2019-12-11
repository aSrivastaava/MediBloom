import React, { Component } from "react";
import {
  createStackNavigator
} from 'react-navigation-stack'
import {Image,Platform,StyleSheet,TouchableOpacity,View,Text,Dimensions,Button} from "react-native";
import { MonoText } from "../../components/StyledText";
const { width, height } = Dimensions.get("screen");

class HomeScreen extends Component {
 
  render() {
    return (
      <View style={styles.container}>
    
      <View>
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('PulseScreen')}}
            style={styles.btn} >
            <Image source={require("./medicine.png")}
              style={styles.image} />
            <Text style={styles.text}>Click Here To Check Pulse</Text>
</TouchableOpacity>
      </View>
      
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Search Pharmacy Store from
                your Phone
        </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              Check Availabiltiy | Navigation
          </MonoText>
          </View>
        </View>
      </View>
    );
  }
}

class PulseScreen extends Component{
  render()
{
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        This is Pulse Page 
      </Text>
    </View>
  );
  }
}
  
export default createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  PulseScreen: { screen: PulseScreen }
})

HomeScreen.navigationOptions = {
  header: null,
  headerVisible: false,
  headerMode: 'none',
  
};
PulseScreen.navigationOptions = {
  header: null,
  headerVisible: false,
};
const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    
  },
  image: {
      width: 300,
      height: 100,
    resizeMode: "contain",
    position: 'absolute',

    },

    text: {
      fontSize: 18,
      color: "#6c63ff",
      fontWeight: "bold",
      // marginLeft: 45,
      // marginRight:50,
      textAlign: "center",
      marginTop:100
     
    },
    btn: {
      marginRight: 50,
      height: 120,
      width: 300,
      marginTop: 100,
      marginLeft: 45,
     

    },
  container: {
    flex: 1,
    backgroundColor: "#fff"  
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    marginTop: 200,
    marginLeft:30,
    marginRight:30,
    marginBottom: 20
  },
  welcomeImage: {
    width: 360,
    height: 150,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
    alignItems:"center"
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    alignContent:'center',
    fontSize: 44,
    color: "#6c63ff",
    fontFamily: "",
    fontWeight:"bold"
  }
});

