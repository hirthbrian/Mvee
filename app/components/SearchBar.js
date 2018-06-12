import React from 'react';
import {
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';

import { View as AView } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSearchInput: true,
            searchText: ''
        };
    }

    render() {

        const { width } = Dimensions.get('window');

        return (
            <AView
                ref={(ref) => {
                    this.searchBar = ref;
                }}
                onTransitionEnd={() => {
                    this.searchInput.focus();
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: Colors.blue,
                    borderColor: Colors.white,
                    borderWidth: 1,
                    paddingHorizontal: 8,
                    paddingVertical: 5,
                    marginHorizontal: 5,
                    borderRadius: 4,
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState({ showSearchInput: true });
                        this.searchBar.transitionTo({ width: width - 4 - 4 }, 600, 'ease');
                    }}
                >
                    <Icon name="search" size={18} color={Colors.white} />
                </TouchableWithoutFeedback>
                {this.state.showSearchInput &&
                    <TextInput
                        ref={(ref) => {
                            this.searchInput = ref;
                        }}
                        onChangeText={(text) => this.setState({ searchText: text })}
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
            </AView>
        );
    }
}