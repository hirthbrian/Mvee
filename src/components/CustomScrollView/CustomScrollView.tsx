import React, { ReactNode } from 'react';
import { Image } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  Color,
  MAX_HEADER_HEIGHT,
} from '../../utils';

import styles from './styles';

function CustomScrollView({
  children,
  backgroundImage,
}: {
  children: ReactNode,
  backgroundImage: string
}) {
  const renderBackground = () => (
    <Image
      style={styles.image}
      source={{ uri: backgroundImage }}
    />
  );

  return (
    <ParallaxScrollView
      outputScaleValue={7}
      fadeOutForeground={false}
      renderBackground={renderBackground}
      contentBackgroundColor={Color.White}
      contentContainerStyle={styles.container}
      parallaxHeaderHeight={MAX_HEADER_HEIGHT}
    >
      {children}
    </ParallaxScrollView>
  );
}

export default CustomScrollView;
