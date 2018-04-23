import React, { Component } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity, AsyncStorage } from "react-native";
import { Images, Colors } from "../Themes";
import { connect } from "react-redux";
import FBSDK, { LoginManager } from "react-native-fbsdk";
const { LoginButton, AccessToken } = FBSDK;
import { NavigationActions } from "react-navigation";

// Styles
import styles from "./Styles/LaunchScreenStyles";

class LaunchScreen extends Component {
  constructor() {
    super();
    this.state={
      login:false
    }
    this.loginFacebook = this.loginFacebook.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount = async () => {
    const login = await AsyncStorage.getItem("login")
    if(login ==="true"){
      this.setState({
        login:true
      })
    }
  };

  getToken = async () => {
    const token = await AccessToken.getCurrentAccessToken();
    this.props.dispatch(NavigationActions.navigate({ routeName: "Facebook" }));
    return token.accessToken.toString();
  };

  loginFacebook() {
    // LoginManager.logOut();
    if(!this.state.login){
      LoginManager.logInWithReadPermissions(["public_profile"])
      .then(async result => {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          const token = await this.getToken();
          AsyncStorage.setItem("login","true")
        }
      })
      .catch(err => {
        alert("Login fail with error: " + err);
      });
    } else {
      this.props.dispatch(NavigationActions.navigate({ routeName: "Facebook" }));
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 200,
            borderRadius: 10,
            backgroundColor: Colors.facebook,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={this.loginFacebook}
        >
          <Text style={{ color: Colors.snow }}>Post event to facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(null, mapDispatchToProps)(LaunchScreen);
