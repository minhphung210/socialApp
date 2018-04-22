import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes";
export default StyleSheet.create({
  container: {
    borderBottomColor: Colors.steel,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    minHeight: Metrics.height / 8 + 20,
    width: Metrics.width,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: { height: 70, width: 70, borderRadius: 35, borderWidth: 1, borderColor: Colors.angiaLogo },
  rightContainer: { height: 60, flex: 1, marginLeft: 20 },
  wrapperName: { flex: 1, justifyContent: "flex-start" },
  wrapperCoinAndCode: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  coin: { height: 20, width: 20, tintColor: Colors.angiaLogo }
});
