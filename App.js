import React from 'react';
import {
  StatusBar,
} from 'react-native';
import * as Font from 'expo-font';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './src/reducers'

import RootStack from './src/config/Rooter';
import Colors from './src/config/Colors';

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      plex: require('./src/assets/fonts/IBMPlexSans-Regular.ttf'),
      'plex-semi-bold': require('./src/assets/fonts/IBMPlexSans-SemiBold.ttf'),
      'plex-extra-light': require('./src/assets/fonts/IBMPlexSans-ExtraLight.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;
    if (!fontLoaded) return null;
    return (
      <Provider store={store}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor={Colors.red}
        />
        <RootStack />
      </Provider>
    );
  }
}
