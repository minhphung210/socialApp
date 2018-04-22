import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import styles from "./Styles/ButtonStyle";

export default class Button extends Component {
  // Prop type warnings
  static propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func,
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  // Defaults for props
  static defaultProps = {
    label: "button",
    onPress: () => {}
  };

  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
    const { label, onPress, customStyle } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, customStyle]}
        onPress={onPress}
      >
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  }
}
