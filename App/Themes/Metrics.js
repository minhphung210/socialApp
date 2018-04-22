import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Used via Metrics.baseMargin
const metrics = {
  height: height,
  width: width,
  statusBar: 20,
  heightOfButton: 50,
  widthOfButton: width - 100,
  borderRadius: 6,
  navBar: 60,
  distance: {
    small: 5,
    medium: 10,
    large: 20,
    xl: 50
  },
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
};

export default metrics;
