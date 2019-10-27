import { StyleSheet } from 'react-native';

import { Color } from '../../utils';

export default StyleSheet.create({
  detailBlock: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: Color.Black,
    fontSize: 28,
    paddingBottom: 10,
  },
  description: {
    color: Color.LightBlack,
  },
  separator: {
    height: 1,
    backgroundColor: Color.Grey,
    marginVertical: 3,
  },
});
