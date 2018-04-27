import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Images, Colors, Fonts } from "../Themes";
import styles from "./Styles/InfomationStyle";

export default class Infomation extends Component {
  // Prop type warnings
  static propTypes = {
    name: PropTypes.string,
    coin: PropTypes.number,
    rightText: PropTypes.string,
    ava: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    onChange: PropTypes.func,
    disabledPress: PropTypes.bool,
    customStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  };

  // Defaults for props
  static defaultProps = {
    name: "Vicoders",
    coin: null,
    rightText: null,
    ava: Images.avatarDefault,
    onChange:() => {},
    disabledPress: false,
    customStyle: {}
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      nextProps.ava !== this.props.ava
    ) {
      return true;
    }
    return false;
  };


  render() {
    const { name, coin, rightText, disabledPress, ava, customStyle } = this.props;
    return (
      <View style={[styles.container, customStyle]}>
        <View>
          <Image source={ava=== null? Images.coverImage: ava} style={styles.avatar} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.wrapperName}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: Colors.facebook, fontSize: Fonts.size.h6 }}>{name}</Text>
          </View>
          <View style={styles.wrapperCoinAndCode}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.coin} source={Images.coin} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: Fonts.size.h6 ,marginLeft: 5, color: Colors.angiaLogo }}>
                {coin}
              </Text>
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: Colors.text }}>{rightText}</Text>
          </View>
        </View>
      </View>
    );
  }
}
