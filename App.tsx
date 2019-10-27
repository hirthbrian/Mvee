import React, { useState, useEffect } from 'react';
import {
  StatusBar,
} from 'react-native';
import * as Font from 'expo-font';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './src/reducers'

import RootStack from './src/screens/Rooter';
import { Color } from './src/utils';

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

const metropolis = require('./src/assets/fonts/Metropolis-Regular.otf');
const metropolisBold = require('./src/assets/fonts/Metropolis-Bold.otf');

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      metropolis,
      'metropolis-bold': metropolisBold,
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) return null;

  return (
    <Provider store={store}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Color.Red}
      />
      <RootStack />
    </Provider>
  );
};

export default App;
