import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class FetchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }

    loadData() {
        // https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url).then(response => response.text()).then(responseText => {
            this.setState({
                showText: responseText
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>FetchPage to React Native!</Text>
                <View style={styles.input_container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            this.searchKey = text
                        }}
                    />
                    <Button
                        title='get input'
                        onPress={() => {
                            this.loadData();
                        }}
                    />
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 30,
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});