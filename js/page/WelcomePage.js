import React, { Component } from 'react';
import NavigationUtil from '../navigator/NavigationUtil';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  
  componentDidMount() {
    this.timer = setTimeout(() => {
      SplashScreen.hide();
      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation
      })
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return null
  }
}