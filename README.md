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
