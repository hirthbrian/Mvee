import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import { Color } from '../utils';

const Loading = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: Color.White,
    }}
  >
    <ActivityIndicator
      size="large"
      color={Color.Red}
    />
  </View>
);

export default Loading;
