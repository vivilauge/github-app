import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
});


const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            // header: null // 不为空， 显示出返回
        }
    }
});

export default createAppContainer(createSwitchNavigator({ // 链接两个navigator
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    defaultNavigationOptions: { // 不希望有navigation bar
        header: null
    }
}))