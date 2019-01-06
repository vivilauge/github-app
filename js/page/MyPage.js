import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import actions from '../action/index';
import NavigationUtil from '../navigator/NavigationUtil';

class MyPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>My to React Native!</Text>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);