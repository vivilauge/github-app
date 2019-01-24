import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, DeviceInfo } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar';
import actions from '../action/index';
import NavigationUtil from '../navigator/NavigationUtil';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const THEME_COLOR = '#678';

class MyPage extends Component {
  getRightButton() {
    return <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => {
        }}
      >
        <View style={{ padding: 5, marginRight: 8 }}>
          <Feather
            name={'search'}
            size={24}
            style={{ color: 'white' }}
          />
        </View>

      </TouchableOpacity>
    </View>
  }

  getLeftButton(callBack) {
    return <TouchableOpacity
      style={{ padding: 8, paddingLeft: 12 }}
      onPress={callBack}>
      <Ionicons
        name={'ios-arrow-back'}
        size={26}
        style={{ color: 'white' }} />
    </TouchableOpacity>
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };

    let navigationBar =
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />;

    return (
      <View style={styles.container}>
        {navigationBar}
        <Button
          title='change theme color'
          onPress={() => {
            this.props.onThemeChange('blue')
          }}
        />
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
          }} />
        <Button
          title='go to AsyncStorePage'
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, 'AsyncStorePage')
          }} />
        <Button
          title='go to DataStrogePage'
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, 'DataStrogePage')
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);