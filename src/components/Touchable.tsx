import React, { useRef, ReactNode } from 'react';
import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const Touchable = ({
  onPress,
  children,
  containerStyle = {},
}: {
  onPress: (event: GestureResponderEvent) => void,
  children: ReactNode,
  containerStyle?: object,
}) => {
  const viewRef = useRef(null);

  const onPressIn = () => (
    viewRef.current.transitionTo({ scale: 0.95, opacity: 0.5 }, 100)
  );

  const onPressOut = () => (
    viewRef.current.transitionTo({ scale: 1, opacity: 1 })
  );

  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      <Animatable.View
        ref={viewRef}
        style={containerStyle}
      >
        {children}
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default Touchable;
