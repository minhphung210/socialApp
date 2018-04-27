import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import InputScrollView from "react-native-input-scroll-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import FacebookActions from "../Redux/FacebookRedux";
import loadingActions from "../Redux/LoadingScreenRedux";

import FBSDK, { LoginManager } from "react-native-fbsdk";

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import Infomation from "../Components/Infomation";
// Styles
import styles from "./Styles/FacebookStyle";
import { Images, Colors, Metrics, Fonts } from "../Themes";

class Facebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      image: "",
      visibleModal: false
    };
    this.logout = this.logout.bind(this);
    this.upLoadImage = this.upLoadImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.goBack = this.goBack.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handlePostfb = this.handlePostfb.bind(this);
    this.goToHistory = this.goToHistory.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentDidMount = () => {
    AccessToken.getCurrentAccessToken().then(res => {
      this.props.dispatch(
        FacebookActions.getProfileRequest(res.accessToken.toString())
      );
      this.props.dispatch(loadingActions.runLoadingScreen(true));
    });
  };

  logout() {
    LoginManager.logOut();
    this.props.dispatch(NavigationActions.back());
  }

  goToHistory() {
    this.props.dispatch(FacebookActions.getListHistoryRequest());
    this.props.dispatch(loadingActions.runLoadingScreen(true));
  }

  goBack() {
    this.props.dispatch(NavigationActions.back());
  }

  onChange(e) {
    this.setState({
      content: e
    });
  }

  openModal() {
    this.setState({
      visibleModal: !this.state.visibleModal
    });
  }

  upLoadImage() {
    ImagePicker.showImagePicker(response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source
        });
      }
    });
  }

  onContentSizeChange(e) {
    if (e.nativeEvent.contentSize.height > 160) {
      const height =
        e.nativeEvent.contentSize.height - 160;
      this.input.scrollTo({ x: 0, y: height, animated: true });
    }
  }

  handlePostfb() {
    const { image, content } = this.state;
    AccessToken.getCurrentAccessToken()
      .then(res => {
        let data = {};
        if (image === "") {
          data = {
            token: res.accessToken.toString(),
            caption: content
          };
        } else {
          data = {
            token: res.accessToken.toString(),
            caption: content,
            uri: image.uri
          };
        }
        return data;
      })
      .then(res => {
        if (content === "") {
          this.props.dispatch(
            FacebookActions.postFbReceive("Please enter text")
          );
        } else {
          this.props.dispatch(FacebookActions.postFbRequest(res));
          this.props.dispatch(loadingActions.runLoadingScreen(true));
        }
      });
  }

  renderModal() {
    return (
      <View style={styles.modal}>
        <TouchableOpacity
          style={styles.modalTopItem}
          onPress={this.goToHistory}
        >
          <Text style={{ fontSize: Fonts.size.small }}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalBottomItem} onPress={this.logout}>
          <Text style={{ fontSize: Fonts.size.small }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderImage() {
    const { image } = this.state;
    if (image === "") {
      return (
        <TouchableOpacity
          style={{
            height: 80,
            width: 80,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "yellow",
            marginHorizontal: 10
          }}
          onPress={this.upLoadImage}
        >
          <Image source={Images.camera} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.upLoadImage}>
          <Image
            source={image}
            style={{
              height: 80,
              width: 80,
              borderRadius: 10,
              marginHorizontal: 10
            }}
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { visibleModal } = this.state;
    const { profile, postFbMess } = this.props;
    console.log(profile);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Navbar
          color={Colors.facebook}
          leftIcon={Images.leftArrow}
          rightIcon={Images.setting}
          rightFunction={this.openModal}
          leftFunction={this.goBack}
        />
        <Infomation
          name={profile !== undefined ? profile.name : ""}
          ava={
            profile.name !== undefined
              ? { uri: profile.ava.data.url }
              : Images.avatarDefault
          }
        />
        {visibleModal && this.renderModal()}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="never"
          keyboardDismissMode={"on-drag"}
          enableResetScrollToCoords={false}
          contentContainerStyle={{flex:1, alignItems: "center" }}
        >
          <View style={{ borderWidth: 0.4, borderColor: "#BDBDBD" }}>
            <ScrollView
              ref={scrollView => (this.input = scrollView)}
              style={{
                maxHeight: 160,
                width: Metrics.width,
                borderBottomWidth: 0.4,
                borderColor: "#BDBDBD"
              }}
            >
              <TextInput
                style={{ flex: 1 }}
                placeholder="What do you mean?"
                value={this.state.content}
                onChangeText={this.onChange}
                placeholderTextColor="#BDBDBD"
                multiline
                autoFocus={false}
                onContentSizeChange={this.onContentSizeChange}
                underlineColorAndroid={Colors.transparent}
              />
            </ScrollView>
            <View
              style={{
                height: 100,
                width: Metrics.width,
                justifyContent: "center"
              }}
            >
              {this.renderImage()}
            </View>
          </View>
          <Text style={{ marginTop: 20, color: "red" }}>{postFbMess}</Text>
          <Button
            onPress={this.handlePostfb}
            customStyle={{ marginTop: 10 }}
            label="Post"
          />
          {/* <TouchableOpacity
            onPress={this.logout}
            style={{ height: 40, width: 60, backgroundColor: "red" }}
          /> */}
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.facebook.profile,
    postFbMess: state.facebook.postFbMess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facebook);
