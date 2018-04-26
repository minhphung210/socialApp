import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import { GoogleSignin } from "react-native-google-signin";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { checkContent } from "../Services/Validate/ValidateSendEmail";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import googleActions from "../Redux/GoogleRedux";
import loadingActions from "../Redux/LoadingScreenRedux";

import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import Infomation from "../Components/Infomation";
// Styles
import styles from "./Styles/GooglemailStyle";
import { Images, Colors, Metrics } from "../Themes";

class Googlemail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      receiver: "",
      listReceiver: [],
      content: "",
      password: "",
      image: ""
    };
    this.goBack = this.goBack.bind(this);
    this.logout = this.logout.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeReceiver = this.onChangeReceiver.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.upLoadImage = this.upLoadImage.bind(this);
  }

  goBack() {
    this.props.dispatch(NavigationActions.back());
  }

  logout() {
    GoogleSignin.signOut()
      .then(() => {
        this.goBack();
      })
      .catch(err => {
        Alert.alert(err);
      });
  }

  onChangeTitle(e) {
    this.setState({
      title: e
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e
    });
  }

  onChangeReceiver(e) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { listReceiver, receiver } = this.state;
    if (re.test(String(receiver).toLowerCase())) {
      listReceiver.push({ email: e });
      this.setState({
        listReceiver,
        receiver: ""
      });
    } else {
      this.setState({
        receiver: e
      });
    }
  }

  onChangeContent(e) {
    this.setState({
      content: e
    });
  }

  onContentSizeChange(e) {
    if (e.nativeEvent.contentSize.height > 199) {
      const height = e.nativeEvent.contentSize.height - 200;
      this.input.scrollTo({ x: 0, y: height, animated: true });
    }
  }

  keyExtractor = (item, index) => index;

  removeItem(e) {
    const { listReceiver } = this.state;
    listReceiver.splice(e, 1);
    this.setState({
      listReceiver
    });
  }

  sendEmail() {
    const { title, content, listReceiver, password, image } = this.state;
    const { profile } = this.props;
    let newArr = "";
    listReceiver.forEach(e => {
      newArr= newArr + e.email +","
    });
    const validate = {
      title,
      newArr,
      password,
      content
    };
    console.log(image);
    const mess = checkContent(validate);
    if (mess === "") {
      const data = {
        subject: title,
        img: image.uri,
        receivers: newArr,
        content,
        pass: password,
        user: profile.email
      };
      this.props.dispatch(loadingActions.runLoadingScreen(true));
      this.props.dispatch(googleActions.sendEmailRequest(data));
    } else {
      this.props.dispatch(googleActions.sendEmailReceive(mess));
    }
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

  renderItem(e) {
    return (
      <View
        style={{
          width: 150,
          margin: 2,
          height: 32,
          flexDirection: "row",
          borderRadius: 10,
          backgroundColor: Colors.steel
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {e.item.email}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 32,
            width: 32,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => this.removeItem(e.index)}
        >
          <Image
            resizeMode="contain"
            source={Images.close}
            style={{ height: 10, width: 10 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { listReceiver, receiver, content, title, password } = this.state;
    const { profile, mess } = this.props;
    return (
      <View style={styles.container}>
        <Navbar
          leftIcon={Images.leftArrow}
          leftFunction={this.goBack}
          color={Colors.error}
          rightIcon={Images.logout}
          rightFunction={this.logout}
        />
        <Infomation
          name={profile.email === undefined ? "" : profile.email}
          ava={
            profile.email === undefined
              ? Images.avatarDefault
              : { uri: profile.photo }
          }
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="never"
          keyboardDismissMode={"on-drag"}
          enableResetScrollToCoords={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <TextInput
            underlineColorAndroid={Colors.transparent}
            placeholderTextColor="#BDBDBD"
            placeholder="Title"
            style={{
              height: 40,
              width: Metrics.width - 20,
              borderBottomWidth: 0.4,
              borderColor: "#BDBDBD"
            }}
            value={title}
            onChangeText={this.onChangeTitle}
          />
          <TextInput
            underlineColorAndroid={Colors.transparent}
            placeholderTextColor="#BDBDBD"
            placeholder="Receiver"
            value={receiver}
            onChangeText={this.onChangeReceiver}
            style={{
              height: 40,
              width: Metrics.width - 20,
              borderBottomWidth: 0.4,
              borderColor: "#BDBDBD"
            }}
          />
          <FlatList
            data={listReceiver}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            extraData={this.state}
            contentContainerStyle={{
              paddingHorizontal: 5,
              alignItems: "flex-start"
            }}
            numColumns={2}
          />
          <ScrollView
            ref={scrollView => (this.input = scrollView)}
            style={{
              marginVertical: 5,
              height: 200,
              width: Metrics.width - 20,
              borderWidth: 0.5,
              borderColor: "#BDBDBD"
            }}
          >
            <TextInput
              underlineColorAndroid={Colors.transparent}
              placeholderTextColor="#BDBDBD"
              placeholder="Content"
              multiline
              onContentSizeChange={this.onContentSizeChange}
              value={content}
              onChangeText={this.onChangeContent}
            />
          </ScrollView>
          {this.renderImage()}
          <TextInput
            underlineColorAndroid={Colors.transparent}
            placeholderTextColor="#BDBDBD"
            placeholder="Password"
            secureTextEntry
            style={{
              height: 40,
              width: Metrics.width - 20,
              borderBottomWidth: 0.4,
              borderColor: "#BDBDBD"
            }}
            value={password}
            onChangeText={this.onChangePassword}
          />
          <Text style={{ marginVertical: 20, color: Colors.error }}>
            {mess}
          </Text>
          <Button
            customStyle={{ marginBottom: 30, backgroundColor: Colors.error }}
            label="Send email"
            onPress={this.sendEmail}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.google.profile,
    mess: state.google.mess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Googlemail);
