import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, Button } from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import FetchPage from './FetchPage';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = ['Java', 'Ios', 'Javscript', 'PHP', 'React', 'React Native', 'Android']
  }
  _genTabs() { // 动态生成tabs
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        // screen: PopularTab,
        screen: props => <PopularTab {...props} tabLabel={item} />, // 根据页面传递当前页面的值
        navigationOptions: {
          title: item
        }
      }
    });
    return tabs;
  }

  render() {
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
      this._genTabs(), {
        tabBarOptions: { // 设置tabs样式
          tabStyle: styles.tabStyle,
          upperCaseLabel: false, // 标签设置小写
          scrollEnabled: true, // 支持选项卡滚动
          style: {
            backgroundColor: '#678' // tabs背景色
          },
          indicatorStyle: styles.indicatorStyle, // 滑动标签指示器样式
          labelStyle: styles.labelStyle, //文字的样式
        }
      }));
    return <View style={{ flex: 1, marginTop: 30 }}><TabNavigator /></View>
  }
}

class PopularTab extends Component {
  render() {
    const { tabLabel } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLabel}</Text>
        <Text onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, 'DetailPage')
        }}>go detailPage</Text>
        <Button 
          title='go to fetchPage'
          onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, 'FetchPage')
        }}/>
        <Button 
          title='go to AsyncStorePage'
          onPress={() => {
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, 'AsyncStorePage')
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  }
});