import React, { Component } from "react";
import { ScrollView, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import FBSDK, { LoginManager } from "react-native-fbsdk";

const { LoginButton, AccessToken } = FBSDK;

// Styles
import styles from "./Styles/FacebookStyle";

class Facebook extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      Alert.alert(data.accessToken.toString());
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={(error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
                alert(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => {
            alert("logout.");
            this.props.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: "LaunchScreen"
                  })
                ]
              })
            );
          }}
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
