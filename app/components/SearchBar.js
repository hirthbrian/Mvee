import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
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
    const { searchText } = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.red,
          borderRadius: 4,
          marginVertical: 10,
          marginHorizontal: 15,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Image
          source={require('../../assets/img/glass.png')}
          style={{
            width: 25,
            height: 25,
            tintColor: Colors.white
          }}
        />
        <TextInput
          autoFocus
          onChangeText={this.onTextChange}
          onEndEditing={this.onEndEditing}
          value={searchText}
          placeholderTextColor={Colors.white}
          selectionColor={Colors.white}
          style={{
            flex: 1,
            fontSize: 18,
            fontFamily: 'plex',
            paddingLeft: 10,
            color: Colors.white,
          }}
        />
      </View>
    );
  }
}

export default connect(null, { search })(SearchBar)