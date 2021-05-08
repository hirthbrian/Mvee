import React, { ReactNode } from 'react';
import { Image } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  Color,
  MAX_HEADER_HEIGHT,
} from '../../utils';

import styles from './styles';

class CustomScrollView extends React.Component {
  renderBackground = () => {
    const { backgroundImage } = this.props;
    
    return (
      <Image
        style={styles.image}
        source={{ uri: backgroundImage }}
      />
    )
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <ParallaxScrollView
        outputScaleValue={7}
        fadeOutForeground={false}
        renderBackground={this.renderBackground}
        contentBackgroundColor={Color.White}
        contentContainerStyle={styles.container}
        parallaxHeaderHeight={MAX_HEADER_HEIGHT}
      >
        {children}
      </ParallaxScrollView>
    );
  }
}

export default CustomScrollView;
