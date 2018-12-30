import React, { Component } from 'react';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicNavigator from '../navigator/DynamicNavigator';

export default class Home extends Component {

  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicNavigator />
  }
}