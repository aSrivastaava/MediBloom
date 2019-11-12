import React, { Component } from "react";
import Expo from "expo-facebook";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import "expo-facebook";
import Animated, { Easing } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TouchableOpacity
} from "react-native-gesture-handler";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";

import styles from "../components/style";

import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHgpbKmG3IhW-jrAytQ9RAUsyiFiLmN1c",
  authDomain: "midbloom-99ce3.firebaseapp.com",
  databaseURL: "https://midbloom-99ce3.firebaseio.com",
  projectId: "midbloom-99ce3",
  storageBucket: "midbloom-99ce3.appspot.com",
  messagingSenderId: "326031542938",
  appId: "1:326031542938:web:e9397d4d139fa280be6d23"
};

firebase.initializeApp(firebaseConfig);

const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  //Initial State
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  //Configure the animation
  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  //Run the animation
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),

    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position
  ]);
}

class MediBloom extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0]

      // extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0]

      //  extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1]

      //  extrapolate: Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100]

      //  extrapolate: Extrapolate.CLAMP
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0]

      //  extrapolate: Extrapolate.CLAMP
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360]

      //  extrapolate: Extrapolate.CLAMP
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }
  signUpUser = (email, password) => {
    try {
      if (this.state.email === "" || this.state.password === "") {
        alert("Email and Password can not be blank.");
        return;
      }
      if (this.state.password.length < 6) {
        alert("Please Enter atleast 6 character password");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  };

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user) {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString());
    }
  };
  async loginWithFacebook() {
    const { type, token } = await Expo.logInWithReadPermissionsAsync(
      "371328787130312",
      { permissions: ["public_profile"] }
    );

    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "flex-end"
        }}
      >
        <KeyboardAvoidingView behavior="padding">
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }]
            }}
          >
            <Svg height={height + 50} width={width}>
              <ClipPath id="clip">
                <Circle r={height + 50} cx={width / 2} />
              </ClipPath>
              <Image
                href={require("../assets/bg2.jpg")}
                width={width}
                height={height + 50}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>
          </Animated.View>
          <View style={{ height: height, justifyContent: "center" }}>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={{
                  ...styles.button,
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }]
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  SIGN IN
                </Text>
              </Animated.View>
            </TapGestureHandler>
            {/* <Animated.View> */}
            <TouchableOpacity
              style={styles.buttonFB}
              onPress={() => this.loginWithFacebook()}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                SIGN IN with Facebook
              </Text>
            </TouchableOpacity>
            {/* </Animated.View> */}
            <Animated.View
              style={{
                zIndex: this.textInputZindex,
                opacity: this.textInputOpacity,
                transform: [{ translateY: this.textInputY }],
                height: height / 3,
                ...StyleSheet.absoluteFill,
                top: null,
                justifyContent: "center"
              }}
            >
              <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={styles.closedButton}>
                  <Animated.Text
                    style={{
                      fontSize: 15,
                      transform: [{ rotate: concat(this.rotateCross, "deg") }]
                    }}
                  >
                    X
                  </Animated.Text>
                </Animated.View>
              </TapGestureHandler>

              <TextInput
                style={styles.textInput}
                placeholder="EMAIL"
                placeholderTextColor="black"
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                placeholder="PASSWORD"
                onChangeText={password => this.setState({ password })}
                style={styles.textInput}
                placeholderTextColor="black"
              />
              <Animated.View style={styles.signButtonContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.loginUser(this.state.email, this.state.password)
                  }
                  style={styles.signButton}
                >
                  {/* <Animated.View> */}
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    SIGN IN
                  </Text>
                  {/* </Animated.View> */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signButton}
                  onPress={() =>
                    this.signUpUser(this.state.email, this.state.password)
                  }
                >
                  {/* <Animated.View> */}
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    SIGN UP
                  </Text>
                  {/* </Animated.View> */}
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
export default MediBloom;
