// 全局导航跳转工具
export default class NavigationUtil {
    // 跳转到指定页面 params, page
    static goPage(params, page) {
        const navigation  = this.navigation; // console.log(NavigationUtil.navigation)
        if (!navigation) {
            console.log('====================================');
            console.log('NavigationUtil.navigation can not be null');
            console.log('====================================');
            return;
        }
        navigation.navigate(
            page, {
                ...params
            }
        );
    }

    // 返回上一页
    static goBack(navigation) {
        navigation.goBack();
    }

    // 重置到首页
    static resetToHomePage(params) {
        const { navigation } = params;
        navigation.navigate('Main');
    }

}