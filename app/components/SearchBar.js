import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Header,
  HeaderBackButton
} from 'react-navigation';
import Colors from '../config/Colors';
import {
  search
} from '../actions';

class SearchBar extends React.Component {
  state = {
    searchText: '',
  }

  onTextChange = text => this.setState({ searchText: text });

  onEndEditing = () => {
    const { search } = this.props;
    const { searchText } = this.state;
    search(searchText);
  }

  render() {
    const { onPress } = this.props;
    const { searchText } = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          backgroundColor: Colors.red,
          height: Header.HEIGHT
        }}
      >
        <HeaderBackButton
          onPress={onPress}
          tintColor={Colors.white}
        />
        <TextInput
          autoFocus
          onChangeText={this.onTextChange}
          onEndEditing={this.onEndEditing}
          value={searchText}
          placeholderTextColor={Colors.white}
          selectionColor={Colors.white}
          keyboardAppearance={'dark'}
          style={{
            flex: 1,
            fontSize: 20,
            fontFamily: 'plex',
            paddingBottom: 10,
            paddingRight: 15,
            color: Colors.white,
          }}
        />
      </View>
    );
  }
}

export default connect(null, { search })(SearchBar)