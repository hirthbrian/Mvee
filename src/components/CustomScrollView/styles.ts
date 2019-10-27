import {
  Dimensions,
  StyleSheet,
} from 'react-native';

import {
  Color,
  MAX_HEADER_HEIGHT,
} from '../../utils';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 25,
    backgroundColor: Color.White,
  },
  image: {
    width,
    height: MAX_HEADER_HEIGHT,
    justifyContent: 'flex-end',
    backgroundColor: Color.White,
  }
});
