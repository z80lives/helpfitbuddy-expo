import { StyleSheet, modalStyleIOS } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 400,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "gray",
    alignSelf: "flex-start",
    textAlign: "center",
  }
});
