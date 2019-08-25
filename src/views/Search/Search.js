import React from 'react';
import {
  View,
  Image,
  FlatList,
  TextInput,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import { HeaderBackButton } from 'react-navigation';
import Label from '../../components/Label';
import Colors from '../../config/Colors';

import styles from './styles';

const { width } = Dimensions.get('window');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  renderItem = ({ item }) => {
    const { goToMovie } = this.props;
    return (
      <TouchableHighlight
        onPress={() => goToMovie(item.id, item.title)}
      >
        <View
          style={{
            backgroundColor: Colors.white,
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={{ uri: item.poster }}
            style={{
              borderRadius: 2,
              width: width / 4,
              height: (width / 4) * 1.55,
            }}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 15,
              alignContent: 'center',
            }}
          >
            <Label
              style={{
                fontSize: 20,
              }}
              numberOfLines={2}
            >
              {item.title}
            </Label>
            <Label
              style={{
                color: Colors.lightBlack,
              }}
            >
              {item.year}
            </Label>
            <Label
              style={{
                fontSize: 10,
                paddingTop: 10,
                color: Colors.lightBlack,
              }}
              numberOfLines={5}
            >
              {item.overview}
            </Label>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  onTextChange = (text) => this.setState({ searchText: text });

  onEndEditing = () => {
    const { search } = this.props;
    const { searchText } = this.state;
    search(searchText);
  };

  renderSearchBar = () => {
    const { hideSearchModal } = this.props;
    const { searchText } = this.state;

    return (
      <View
        style={styles.searchBarContainer}
      >
        <HeaderBackButton
          onPress={hideSearchModal}
          tintColor={Colors.red}
        />
        <TextInput
          autoFocus
          onChangeText={this.onTextChange}
          onEndEditing={this.onEndEditing}
          value={searchText}
          placeholder="Search for movies..."
          selectionColor={Colors.red}
          style={styles.text}
        />
      </View>
    );
  };

  render() {
    const {
      isVisible,
      searchResults,
    } = this.props;

    return (
      <Modal
        useNativeDriver
        isVisible={isVisible}
        style={styles.modalContainer}
      >
        {this.renderSearchBar()}
        <FlatList
          data={searchResults}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Modal>
    );
  }
}

export default Search;
