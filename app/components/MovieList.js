import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Image,
    Button,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ImageBackground
} from 'react-native';

import Colors from '../config/Colors';
import API from '../config/API';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { View as AView } from 'react-native-animatable';

import Touchable from './Touchable';

import MoviePoster from './MoviePoster';
import SearchBar from './SearchBar';

export default class MovieList extends React.Component {

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
        this.search('James Bond');
    }

    goToDetails = (movie) => () => {
        this.props.navigation.navigate('MovieDetails', { movie, title: movie.title });
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
            <MoviePoster
                title={movie.title}
                year={moment(movie.release_date).format('Y')}
                posterUrl={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                onPress={this.goToDetails(movie)}
            />
        );
    };

    _renderShowMore = () => {
        const { width } = Dimensions.get('window');

        const posterWidth = (width - (4 * 3)) / 3;
        const posterHeight = posterWidth * 1.5;

        return (
            <View
                style={{
                    height: posterHeight,
                    width: posterWidth,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.yellow,
                }}
            >
                <Icon name="plus" size={18} color={Colors.black} />
                <Text>
                    Show more
                </Text>
            </View>
        );
    }

    onEndReached = () => {
        this.setState({ page: this.state.page + 1 });
        this.search(this.state.searchText);
    };

    render() {

        return (
            <View
                style={styles.container}
            >
                <SearchBar
                    onSearch={(text) => {
                        if (text) {
                            this.setState({
                                data: [],
                                page: 1,
                            });
                            this.search(text)
                        }
                    }}
                />
                <FlatList
                    data={this.state.data}
                    numColumns={3}
                    renderItem={this._renderItem}
                    onEndReachedThreshold={0.8}
                    onEndReached={this.onEndReached}
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
        backgroundColor: '#F7F7F7',
    },
});