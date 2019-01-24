import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Toast from 'react-native-easy-toast'
import { StyleSheet, Text, View, RefreshControl, FlatList, ActivityIndicator, DeviceInfo} from 'react-native';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavigationBar';
import { connect } from 'react-redux';
import actions from '../action';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const pageSize = 10;//设为常量，防止修改

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
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      title={'最热'}
      statusBar={statusBar}
      style={{
        backgroundColor: THEME_COLOR
      }}
    />;
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
      this._genTabs(), {
        tabBarOptions: { // 设置tabs样式
          tabStyle: styles.tabStyle,
          upperCaseLabel: false, // 标签设置小写
          scrollEnabled: true, // 是否支持 选项卡滚动，默认false
          style: {
            backgroundColor: '#678', // tabs背景色
            height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle: styles.indicatorStyle, // 滑动标签指示器样式
          labelStyle: styles.labelStyle, //文字的样式
        }
      }));
    return <View style={{ flex: 1, marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0 }}>
      {navigationBar}
      <TabNavigator />
    </View>
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

  loadData(loadMore) {
    const { onRefreshPopular, onLoadMorePopular } = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        console.log('没有更多了')
        this.refs.toast.show('没有更多了');
      })
    } else {
      onRefreshPopular(this.storeName, url, pageSize);
    }
  }

  /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
  _store() {
    const { popular } = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],//要显示的数据
        hideLoadingMore: true,//默认隐藏加载更多
      }
    }
    return store;
  }

  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }

  renderItem(data) {
    const item = data.item;
    return <PopularItem item={item} onSelect={() => {

    }} />
  }

  render() {
    let store = this._store();
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
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
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('---onEndReached----');
            setTimeout(() => {
              if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----')
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
});

const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, url, pageSize, items, callback) => dispatch(actions.onLoadMorePopular(storeName, url, pageSize, items, callback)),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});