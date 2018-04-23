import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes/";

export default StyleSheet.create({
  container: {
    alignItems: "center"
  },
  modal: {
    height: 60,
    width: 120,
    backgroundColor: Colors.steel,
    borderWidth: 0.7,
    borderColor: Colors.facebook,
    position: "absolute",
    zIndex: 20,
    top: 50,
    right: 10
  },
  modalTopItem: {
    backgroundColor: Colors.snow,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderColor: Colors.steel
  },
  modalBottomItem: {
    backgroundColor: Colors.snow,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
