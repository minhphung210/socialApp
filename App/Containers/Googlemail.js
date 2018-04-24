import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  NativeModules
} from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {GoogleSignin} from 'react-native-google-signin';
const { RNGoogleSignin } = NativeModules;
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

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
      content: ""
    };
    this.goBack = this.goBack.bind(this);
    this.logout = this.logout.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeReceiver = this.onChangeReceiver.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  // componentDidMount = () => {

  // };

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
      const height =
        e.nativeEvent.contentSize.height - this.state.heightOfInput;
      this.input.scrollTo({ x: 0, y: height, animated: true });
    }
  }

  keyExtractor = (item, index) => index;

  renderItem(e) {
    return (
      <View style={{ height: 20 }}>
        <Text>{e.item.email}</Text>
      </View>
    );
  }

  render() {
    const { listReceiver, receiver, content, title } = this.state;
    return (
      <View style={styles.container}>
        <Navbar
          leftIcon={Images.leftArrow}
          leftFunction={this.goBack}
          color={Colors.error}
          rightIcon={Images.logout}
          rightFunction={this.logout}
        />
        <Infomation />
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
          <Text>{listReceiver.length}</Text>
          <FlatList
            data={listReceiver}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            horizontal
            extraData={this.state}
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
            />
          </ScrollView>
          <Button label="Send email" />
        </KeyboardAwareScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Googlemail);
