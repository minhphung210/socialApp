import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import { Images, Colors } from "../Themes";
import { connect } from "react-redux";
import FBSDK, { LoginManager } from "react-native-fbsdk";
const { LoginButton, AccessToken } = FBSDK;
import { NavigationActions } from "react-navigation";

import { GoogleSignin } from "react-native-google-signin";

import googleActions from "../Redux/GoogleRedux";
// Styles
import Button from "../Components/Button";
import styles from "./Styles/LaunchScreenStyles";

class LaunchScreen extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.loginFacebook = this.loginFacebook.bind(this);
    this.getToken = this.getToken.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
  }

  componentWillMount = () => {
    GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        // play services are available. can now configure library
      })
      .catch(err => {
        Alert.alert("Play services error", err.code, err.message);
      });
    GoogleSignin.configure({
      webClientId:
        "378919532961-sippafc4fmsj99snjpbhr7m6r02bn5c9.apps.googleusercontent.com"
    });
  };

  getToken = async () => {
    const token = await AccessToken.getCurrentAccessToken();
    this.props.dispatch(NavigationActions.navigate({ routeName: "Facebook" }));
    return token.accessToken.toString();
  };

  loginGoogle() {
    GoogleSignin.signIn()
      .then(user => {
        this.props.dispatch(googleActions.getProfileGoogle(user));
        this.props.dispatch(
          NavigationActions.navigate({ routeName: "Googlemail" })
        );
      })
      .catch(err => {
        console.log("WRONG SIGNIN", err);
      })
      .done();
  }

  loginFacebook() {
    // LoginManager.logOut();
    LoginManager.logInWithReadPermissions(["public_profile"])
      .then(async result => {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          const token = await this.getToken();
        }
      })
      .catch(err => {
        alert("Login fail with error: " + err);
      });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: Colors.background,
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={Images.logo}
          style={{ height: 200, width: 240, marginBottom: 100 }}
        />
        <Button label="Post to Facebook" onPress={this.loginFacebook} />
        <Button
          customStyle={{ marginTop: 20, backgroundColor: Colors.error }}
          label="Send email"
          onPress={this.loginGoogle}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(null, mapDispatchToProps)(LaunchScreen);
