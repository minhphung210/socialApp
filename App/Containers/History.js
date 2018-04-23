import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { NavigationActions } from "react-navigation";
import Navbar from "../Components/Navbar";

// Styles
import styles from "./Styles/HistoryStyle";
import { Images, Colors, Metrics } from "../Themes";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goBack = this.goBack.bind(this);
    this.renderHeaderTitle = this.renderHeaderTitle.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount = () => {
    console.log(this.props.listHistory);
  };

  goBack() {
    this.props.dispatch(NavigationActions.back());
  }

  keyExtractor = (item, index) => index;

  renderItem(e) {
    console.log(e);
    return (
      <View
        style={{
          height: 65,
          width: Metrics.width - 40,
          marginVertical: 5,
          borderWidth: 0.5,
          paddingHorizontal: 5,
          backgroundColor: Colors.frost,
          borderRadius: 10
        }}
      >
        <Text>ID: {e.item.id}</Text>
        <Text>Time: {e.item.time}</Text>
        <Text>Content:{e.item.content}</Text>
      </View>
    );
  }

  renderHeaderTitle() {
    return (
      <View
        style={{
          height: 40,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.snow, fontSize: 20 }}>History</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          color={Colors.facebook}
          leftIcon={Images.leftArrow}
          leftFunction={this.goBack}
          childrenComponent={this.renderHeaderTitle()}
        />
        <FlatList
          data={this.props.listHistory}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    listHistory: state.facebook.listHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
