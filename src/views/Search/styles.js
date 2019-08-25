import { StyleSheet } from 'react-native';

import Colors from '../../config/Colors';

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
    backgroundColor: Colors.white,
  },
  listContainer: {
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 5,
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'plex',
    paddingBottom: 10,
    paddingRight: 15,
    color: Colors.lightBlack,
  },
});
