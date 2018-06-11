import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    FlatList,
    TextInput,
    Image,
    TouchableHighlight,
    Dimensions,
    ImageBackground
} from 'react-native';

import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'react-native-elevated-view'
import { View as AView } from 'react-native-animatable';
import StarRating from 'react-native-star-rating';

import API from '../config/API';
import Colors from '../config/Colors';
import MoviePoster from './MoviePoster';

export default class MovieDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movie: {},
            similarMovies: [],
        };
    }

    componentDidMount() {

        const { params } = this.props.navigation.state;

        API.getMovie(params.movie.id, (result) => {
            this.setState({ movie: result });
            API.getSimilarMovies(result.id, 1, (result) => {
                this.setState({ similarMovies: result });
            })
        });
    }

    goToDetails = (movie) => () => {
        this.props.navigation.navigate('MovieDetails', { movie, title: movie.title});
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

    render() {
        const { width, height } = Dimensions.get('window');

        const { movie } = this.state;

        return (
            <ScrollView
                style={styles.container}
            >
                <ImageBackground
                    style={{
                        width: width,
                        height: 250,
                        justifyContent: 'flex-end',
                        backgroundColor: Colors.green
                    }}
                    source={{ uri: `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` }}
                >
                    <LinearGradient
                        colors={[Colors.transparent, Colors.transparent, '#F7F7F7']}
                        style={{
                            flex: 1,
                            paddingBottom: 10,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Text
                            style={{
                                paddingHorizontal: 10,
                                fontSize: 28,
                                fontWeight: '600',
                                color: Colors.white,
                            }}
                        >
                            {movie.title}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                paddingHorizontal: 10,
                                fontSize: 12,
                                fontWeight: '600',
                                color: Colors.white,
                            }}
                        >
                            {movie.tagline}
                        </Text>
                    </LinearGradient>
                </ImageBackground>

                <AView
                    style={{
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#EEEEEE',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12
                        }}
                    >
                        {moment(movie.release_date).format('MMMM Do YYYY')}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12
                        }}
                    >
                        {movie.runtime && `${moment().minute(movie.runtime).format('H[h] mm')}`}
                    </Text>
                </AView>

                <AView
                    style={{
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#EEEEEE',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <StarRating
                            disabled={true}
                            starSize={32}
                            maxStars={10}
                            emptyStarColor={Colors.green}
                            fullStarColor={Colors.green}
                            emptyStarColor={Colors.green}
                            rating={movie.vote_average}
                            containerStyle={{
                                alignItems: 'center',

                            }}
                        />
                    </View>
                </AView>

                <AView
                    style={{
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#EEEEEE'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12
                        }}
                    >
                        {movie.overview}
                    </Text>
                </AView>

                        <Text
                        style={{
                            fontSize: 24,
                            padding: 10
                        }}
                    >
                        Similar Movies
                    </Text>

                <FlatList
                    horizontal={true}
                    data={this.state.similarMovies}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ width: 8 }} />
                        );
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ width: 8 }} />
                        );
                    }}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `movie-similar-item-${index}`}
                />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
});