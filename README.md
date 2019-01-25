# react-native

#### 介绍
github app 

npm install 之后需要依赖的原生插件
1. react-native link react-native-vector-icons
2. react-native link react-native-gesture-handler

#### Navigation

1. 2-5 welcome页面 - 首页
2. 2-6 配置4个底部导航
3. 2-7 导航框架搭建-顶部导航
4. 2-8 高级应用&实现动态导航器-底部导航
5. 2-9 高级应用&实现动态导航器-顶部导航
6. 2-10 react-navigation 过渡到3x版本

react-native-gesture-handler 配置(默认已配置，若出错,一一排查)

1. Libraries目录下 RNGestureHandler.xcodeproj 是否添加
若未添加， 选择node-modules下的react-native-gesture-handler目录添加RNGestureHandler.xcodeproj文件

2. 项目根目录 -> TARGETS 找到 linked Frameworks and Libraries标题
找到文件libRNGestureHandler.a 删除 再搜索get... 添加。 clean重新编译

#### Redux
1. 4-1 基于Redux与react-navigation的项目框架搭建
   1. yarn add react-navigation-redux-helpers
   2. yarn add redux
   3. yarn add react-redux

2. 4-2 Redux与react-navigation场景处理android物理返回键

#### 网络编程与数据存储技术
1. 5-1 RN网络编程之Fetch实操
2. 5-2 RN数据库编程之AsyncStorage
3. 5-3 RN离线缓存框架设计实操

#### 最热模块开发
1. 6-1 基于Redux+FlatList实现列表页数据加载 && 列表实现&数据渲染
2. 6-2 自定义组件实现列表Item
3. 6-3 FlatList的高级应用&上拉加载更多功能实现

#### 趋势模块开发
1. 7-1 如何自定义React Native组件 && 实现自定义组件NavigationBar
2. 7-2 趋势页面开发
3. 7-3 如何实现React Native自定义弹框(Modal组件的使用) && 趋势菜单功能开发
4. 7-4 详情页面开发（WebView、代码封装与复用提取、模块化)

#### 收藏模块开发
1. 8-1 基于多数据存储设计思想实现FavoriteDao && 收藏功能的实现
2. 8-2 实现收藏页面

#### 我的模块开发
1. 9-1 实现我的列表页
2. 9-2 实现简单浏览器