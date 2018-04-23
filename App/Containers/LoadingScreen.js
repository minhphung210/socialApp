import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoadingScreenStyle';
import { Colors } from '../Themes';

class LoadingScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const {run} = this.props;
    if(run){
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={Colors.angiaLogo} />
        </View>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    run: state.loadingScreen.run
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
