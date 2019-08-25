import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Colors from '../config/Colors';

class Loading extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.white,
        }}
      >
        {/* <Animatable.Image
          useNativeDriver
          source={require('../assets/logo.png')}
          animation="pulse"
          duration={2000}
          iterationCount="infinite"
          style={{
            width: 60,
            height: 60,
            opacity: 0.3,
          }}
        /> */}

        <ActivityIndicator
          size="large"
          color={Colors.red}
        />
      </View>
    );
  }
}

export default Loading;
