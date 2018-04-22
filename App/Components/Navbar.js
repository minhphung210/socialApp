import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./Styles/NavbarStyle";
import { Colors } from "../Themes";

export default class Navbar extends Component {
  // Prop type warnings
  static propTypes = {
    color: PropTypes.string,
    leftIcon: PropTypes.number,
    leftFunction: PropTypes.func,
    childrenComponent: PropTypes.node,
    rightFunction: PropTypes.func,
    rightIcon: PropTypes.number,
    customStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ])
  };

  // Defaults for props
  static defaultProps = {
    color: Colors.cloud,
    leftIcon: null,
    leftFunction: () => {},
    rightFunction: () => {},
    rightIcon: null,
    customStyle: null
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {
      color,
      leftIcon,
      leftFunction,
      childrenComponent,
      rightFunction,
      rightIcon,
      customStyle
    } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: color }, customStyle]}>
        <TouchableOpacity onPress={leftFunction} style={styles.button}>
          <Image
            source={leftIcon}
            style={styles.leftIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {childrenComponent}
        <TouchableOpacity onPress={rightFunction} style={styles.button}>
          <Image
            source={rightIcon}
            style={styles.leftIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
