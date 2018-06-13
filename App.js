import React from 'react';
import {
  StatusBar,
  View,
  YellowBox,
} from 'react-native';

import Colors from './app/config/Colors';
import RootStack from './app/config/Rooter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.transparent}
          translucent
        />
        <RootStack />
      </View>
    );
  }
}
