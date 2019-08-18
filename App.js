import React from 'react';
import {
  StatusBar,
} from 'react-native';
import * as Font from 'expo-font';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './app/reducers'

import RootStack from './app/config/Rooter';
import Colors from './app/config/Colors';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
);

const store = createStore(reducers, {}, enhancer);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'plex-extra-light': require('./assets/fonts/IBMPlexSans-ExtraLight.ttf'),
      'plex': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
      'plex-semi-bold': require('./assets/fonts/IBMPlexSans-SemiBold.ttf'),
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
          barStyle="light-content"
          backgroundColor={Colors.transparent}
        />
        <RootStack />
      </Provider>
    );
  }
}
