import {AppRegistry} from 'react-native';
import AppNavigators from './js/navigation/AppNavigators';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigators);
