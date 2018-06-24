import React from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../config/Colors';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchInput: false,
      searchText: '',
    };
  }

  render() {
    return (
      <View
        ref={(ref) => {
          this.searchBar = ref;
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.red,
          borderColor: Colors.white,
          borderBottomWidth: this.state.showSearchInput ? 2 : 0,
          paddingBottom: 5,
        }}
      >
        <TouchableWithoutFeedback
          hitSlop={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
          onPress={() => {
            this.setState({ showSearchInput: true }, () => {
              this.searchInput.focus();
            });
          }}
        >
          <View>
            <Icon name="search" size={18} color={Colors.white} />
          </View>
        </TouchableWithoutFeedback>
        {this.state.showSearchInput &&
          <TextInput
            ref={(ref) => {
              this.searchInput = ref;
            }}
            onChangeText={text => this.setState({ searchText: text })}
            onEndEditing={() => this.props.onSearch(this.state.searchText)}
            value={this.state.searchText}
            placeholderTextColor={Colors.white}
            selectionColor={Colors.white}
            underlineColorAndroid={Colors.transparent}
            style={{
              flex: 1,
              paddingVertical: 0,
              paddingLeft: 5,
              color: Colors.white,
            }}
          />
        }
      </View>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  onSearch: null,
};
