import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    height: Metrics.heightOfButton,
    width: Metrics.widthOfButton,
    borderRadius: Metrics.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.facebook
  },
  label: {
    fontWeight: "bold",
    color: Colors.snow
  }
});
