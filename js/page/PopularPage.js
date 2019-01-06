import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import action from '../action';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';

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
        screen: props => <PopularTabPage {...props} tabLabel={item} />, // 根据页面传递当前页面的值
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
  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { onLoadPopularData } = this.props;
    const url = this.genFetchUrl(this.storeName);
    onLoadPopularData(this.storeName, url);
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  renderItem(data) {
    const item = data.item;
    return <View style={{ marginBottom: 10 }}>
      <Text style={{ backgroundColor: '#ccc' }}>{JSON.stringify(item)}</Text>
    </View>
  }

  render() {
    const { popular } = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
      }
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={store.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
});

const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url) => dispatch(action.onLoadPopularData(storeName, url))
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

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