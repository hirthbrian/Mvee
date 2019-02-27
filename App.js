import React from 'react';
import {
  StatusBar,
} from 'react-native';
import {
  Font,
  Asset,
} from 'expo';

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

  componentWillMount() {
    Font.loadAsync({
      'plex-extra-light': require('./assets/fonts/IBMPlexSans-ExtraLight.ttf'),
      'plex': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
      'plex-semi-bold': require('./assets/fonts/IBMPlexSans-SemiBold.ttf'),
    }).then(async () => {
      await Asset.fromModule(require('./assets/img/imdb.png')).downloadAsync();
      await Asset.fromModule(require('./assets/img/metacritic.png')).downloadAsync();
      await Asset.fromModule(require('./assets/img/rotten_tomatoes.png')).downloadAsync();
      this.setState({ fontLoaded: true });
    });
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
