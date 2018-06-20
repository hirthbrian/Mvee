import React from 'react';
import { YellowBox } from 'react-native';

import RootStack from './app/config/Rooter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
  }

  render() {
    return (
      <RootStack />
    );
  }
}
