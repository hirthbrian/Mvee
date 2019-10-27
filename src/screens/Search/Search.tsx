import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import SearchItem from '../../components/SearchItem';
import { Color } from '../../utils';

import styles from './styles';

const searchIcon = require('../../assets/img/search.png');

const Search = ({
  search,
  isVisible,
  goToMovie,
  searchResults,
  hideSearchModal,
}) => {
  const [searchText, setSearchText] = useState('');

  const renderItem = ({ item }) => (
    <SearchItem
      id={item.id}
      title={item.title}
      year={item.year}
      posterImage={item.poster}
      voteAverage={item.voteAverage}
      onPress={goToMovie}
    />
  );

  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      style={styles.modalContainer}
      onBackdropPress={hideSearchModal}
    >
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Color.Red,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Color.White,
          }}
        >
          Search
        </Text>
      </View>

      <View
        style={{
          paddingBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: Color.Red,
        }}
      >
        <View
          style={styles.searchBarContainer}
        >
          <Image
            source={searchIcon}
            style={{
              width: 18,
              height: 18,
              tintColor: Color.Black,
            }}
          />
          <TextInput
            autoFocus
            onChangeText={setSearchText}
            onEndEditing={() => search(searchText)}
            value={searchText}
            // placeholderTextColor={Color.Red}
            placeholder="Search for movies..."
            selectionColor={Color.Red}
            style={styles.text}
          />
        </View>
      </View>

      <FlatList
        style={{
          backgroundColor: Color.White,
        }}
        data={searchResults}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </Modal>
  );
};

export default Search;
