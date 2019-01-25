import React  from "react";
import { BackHandler } from "react-native";

/**
 * Android物理回退键处理
 */
export default class BackPressComponent {
    constructor(props) {
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        console.log('componentDidMount');
        if (this.props.backPress) BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        
        if (this.props.backPress) BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress);
    }

    onHardwareBackPress(e) {
        console.log('onHardwareBackPress');
        return this.props.backPress(e);
    }
}