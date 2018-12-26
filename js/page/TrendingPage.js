import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Trending extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Trending to React Native!</Text>
        <Button
          title='change theme color'
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: 'red',
                updateTime: new Date().getTime()
              }
            })
          }}
        />
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
