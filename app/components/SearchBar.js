import React from 'react';
import {
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';

import { View as AView } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MovieList extends React.Component {

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
                    // width: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: Colors.red,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    margin: 4,
                    borderRadius: 4,
                }}
            >
                <TouchableWithoutFeedback
                    // onPress={() => {
                    //     this.setState({ showSearchInput: true });
                    //     this.searchBar.transitionTo({ width: width - 4 - 4 }, 300, 'ease');
                    // }}
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
                        placeholder={'Search for a Movie...'}
                        placeholderTextColor={'#F7F7F7'}
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