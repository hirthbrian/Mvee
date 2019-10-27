import { StyleSheet } from 'react-native';

import { Color } from '../../utils';

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    marginTop: 50,
  },
  searchBarContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 6,
    backgroundColor: Color.Grey,
  },
  text: {
    flex: 1,
    paddingLeft: 10,
    color: Color.Black,
  },
});
