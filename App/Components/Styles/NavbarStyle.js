import { StyleSheet } from "react-native";
import { Metrics } from "../../Themes";

export default StyleSheet.create({
  container: {
    height: Metrics.navBar,
    width: Metrics.width,
    flexDirection: "row",
    paddingHorizontal: Metrics.distance.small,
    justifyContent: "space-between",
    alignItems: "center",

  },
  button: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center"
  },
  leftIcon: {
    height: 25,
    width: 25
  }
});
