import { StyleSheet, Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 5,
          height: 5
        },
        shadowColor: "black",
        shadowOpacity: 0.3
      },
      android: { elevation: 2 }
    })
  },
  closedButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 5,
          height: 5
        },
        shadowColor: "black",
        shadowOpacity: 0.3
      },
      android: { elevation: 2 }
    })
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)"
  }
});
