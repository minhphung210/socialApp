import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes";
// import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    height: Metrics.height,
    width: Metrics.width,
    position: "absolute",
    zIndex: 101,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.4,
    backgroundColor: Colors.steel
  }
});
