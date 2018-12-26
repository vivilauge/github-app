import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import { StyleSheet } from 'react-native';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import MyPage from '../page/MyPage';
import FavoritePage from '../page/FavoritePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from './NavigationUtil';

type Props = {};

const TABS = { // 在这里配置路由页面
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo
          name={'user'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
}

export default class DynamicNavigator extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  _tabNavigator() {
    const { PopularPage, TrendingPage, MyPage, FavoritePage } = TABS;
    const tabs = { PopularPage, TrendingPage, MyPage, FavoritePage };
    // PopularPage.navigationOptions.tabBarLabel = '最新'  // 动态修改参数
    return createBottomTabNavigator(tabs, {
      tabBarComponent: TabBarComponent
    })
  }
  render() {
    NavigationUtil.navigation = this.props.navigation;
    const Tab = this._tabNavigator();
    return <Tab />
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }

  render() {
    const { routes, index } = this.props.navigation.state; // 取出定义的数据
    const routesIndex = routes[index]; // 定义当前的navigation

    if (routesIndex.params) {
      const { theme } = routesIndex.params;
      // 以最新的时间为主， 防止被其他tab之前的修改覆盖掉
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    };

    return <BottomTabBar
      {...this.props}
      activeTintColor={this.theme.tintColor || this.props.activeTintColor}
    />
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
