import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import Colors from '../config/Colors';

export default class Loading extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.blue,
        }}
      >
        <ActivityIndicator
          size={'large'}
          color={Colors.white}
        />
      </View>
    );
  }
}