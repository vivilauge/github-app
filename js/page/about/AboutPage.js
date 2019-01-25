import React, { Component } from 'react';
import { View } from 'react-native';
import NavigationUtil from "../../navigator/NavigationUtil";
import { MORE_MENU } from "../../common/MORE_MENU";
import ViewUtil from "../../util/ViewUtil";
import AboutCommon, { FLAG_ABOUT } from "./AboutCommon";
import config from '../../res/data/config'
import GlobalStyles from "../../res/styles/GlobalStyles";
import BackPressComponent from "../../common/BackPressComponent";

const THEME_COLOR = '#678';

export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutCommon({
            ...this.params,
            navigation: this.props.navigation,
            flagAbout: FLAG_ABOUT.flag_about_me,
        }, data => this.setState({ ...data })
        );
        this.state = {
            data: config,
        }
        this.backPress = new BackPressComponent({ backPress: () => this.onBackPress() });
    }

    onBackPress() {
        NavigationUtil.goBack(this.props.navigation);
        return true;
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onClick(menu) {
        let RouteName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break
        }
        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }
    }

    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
    }

    render() {
        const content = <View>
            {this.getItem(MORE_MENU.Tutorial)}
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line} />
            {this.getItem(MORE_MENU.Feedback)}
        </View>;
        return this.aboutCommon.render(content, this.state.data.app);
    }
}