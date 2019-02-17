import React from 'react';
import {
  Font
} from 'expo';

import RootStack from './app/config/Rooter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  componentWillMount() {
    Font.loadAsync({
      'plex-bold': require('./assets/fonts/IBMPlexSans-Bold.ttf'),
      'plex-extra-light': require('./assets/fonts/IBMPlexSans-ExtraLight.ttf'),
      'plex-italic': require('./assets/fonts/IBMPlexSans-Italic.ttf'),
      'plex-light': require('./assets/fonts/IBMPlexSans-Light.ttf'),
      'plex-medium': require('./assets/fonts/IBMPlexSans-Medium.ttf'),
      'plex': require('./assets/fonts/IBMPlexSans-Regular.ttf'),
      'plex-semi-bold': require('./assets/fonts/IBMPlexSans-SemiBold.ttf'),
      'plex-thin': require('./assets/fonts/IBMPlexSans-Thin.ttf'),
    }).then(() => {
      this.setState({ fontLoaded: true });
    });
  }

  render() {
    const { fontLoaded } = this.state;
    if (!fontLoaded) return null;
    return (
      <RootStack />
    );
  }
}
