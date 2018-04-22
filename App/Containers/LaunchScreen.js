import React, { Component } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { Images } from "../Themes";
import { connect } from 'react-redux'
import FBSDK, {LoginManager}  from "react-native-fbsdk" 
const { LoginButton, AccessToken } = FBSDK;
import { NavigationActions } from "react-navigation";

// Styles
import styles from "./Styles/LaunchScreenStyles";

 class LaunchScreen extends Component {
  constructor(){
    super()
    this.handle = this.handle.bind(this);
  }

  handle() {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          console.log(result);
          alert(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
        }
      },
      function(error) {
        alert("Login fail with error: " + error);
      }
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <LoginButton
            publishPermissions={["publish_actions"]}
            onLoginFinished={(error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data.accessToken.toString()) 
                  alert(data.accessToken.toString());
                  this.props.dispatch(NavigationActions.navigate({ routeName: "Facebook"}))
                });
              }
            }}
            onLogoutFinished={() => {}}
          />
          <TouchableOpacity onPress={this.handle} style={{height:50, width:150 , backgroundColor:'red'}} />
          <View style={styles.section}>
            <Image source={Images.ready} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(null, mapDispatchToProps)(LaunchScreen)
