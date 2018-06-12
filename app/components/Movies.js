import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';

import Colors from '../config/Colors';
import API from '../config/API';
import moment from 'moment';

import Poster from './Poster';

export default class Movies extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: 1,
            searchText: null,
            showSearchInput: false,
        };
        this.searchBar = null;
        this.searchInput = null;
    }

    componentWillMount() {
        this.props.navigation.setParams({ onSearch: this.onSearch });
        this.search('James Bond');
    }

    onSearch = (text) => {
        if (text) {
            this.setState({
                data: [],
                page: 1,
            });
            this.search(text)
        }
    }

    goToDetails = (movie) => () => {
        this.props.navigation.navigate('Movie', { movie, title: movie.title });
    }

    search = (query) => {
        API.getMovies(query, this.state.page, (result) => {
            if (result.length !== 0) {
                const results = this.state.data.concat(result);
                this.setState({ data: results });
            }
        });
    }

    _renderItem = (data) => {

        const movie = data.item;

        return (
            <Poster
                title={movie.title}
                year={moment(movie.release_date).format('Y')}
                posterUrl={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                onPress={this.goToDetails(movie)}
            />
        );
    };

    onEndReached = () => {
        this.setState({ page: this.state.page + 1 });
        this.search(this.state.searchText);
    };

    render() {

        return (
            <View
                style={styles.container}
            >
                <FlatList
                    data={this.state.data}
                    numColumns={3}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0.8}
                    // onEndReached={this.onEndReached}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `movie-item-${index}`}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.brown,
    },
});