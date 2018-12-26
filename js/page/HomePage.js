import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import MyPage from './MyPage';
import FavoritePage from './FavoritePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from '../navigation/NavigationUtil';
import DynamicNavigator from '../navigation/DynamicNavigator';

type Props = {};
export default class Home extends Component<Props> {

  render() {
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicNavigator />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
