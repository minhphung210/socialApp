import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import FBSDK, { LoginManager } from "react-native-fbsdk";

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import Infomation from "../Components/Infomation";
// Styles
import styles from "./Styles/FacebookStyle";
import { Images, Colors, Metrics } from "../Themes";

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
    this.scrollEnd = this.scrollEnd.bind(this);
  }

  logout() {
    LoginManager.logOut();
    this.props.dispatch(NavigationActions.back());
  }

  scrollEnd(e){
    console.log(e);
    this.input.scrollToEnd({animated: true});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Navbar
          color={Colors.facebook}
          leftIcon={Images.leftArrow}
          rightIcon={Images.setting}
        />
        <Infomation />
        <View>
          <ScrollView
            contentContainerStyle={{
              height: 200,
              width: Metrics.width,
              borderWidth: 0.5,
              borderColor: "grey"
            }}
            ref={input => this.input =input}
          >
            <TextInput
              placeholder="What do you mean?"
              style={{
                minHeight: 30,
                width: Metrics.width,
              }}
              onKeyPress={this.scrollEnd}
              multiline
              autoFocus={false}
              underlineColorAndroid={Colors.transparent}
            />
          </ScrollView>
          <View
            style={{
              height: 40,
              backgroundColor: "blue",
              width: Metrics.width
            }}
          />
        </View>
        <Button />
        <TouchableOpacity
          onPress={this.logout}
          style={{ height: 40, width: 60, backgroundColor: "red" }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
