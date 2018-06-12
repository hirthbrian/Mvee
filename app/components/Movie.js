import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    FlatList,
    Dimensions,
    ImageBackground
} from 'react-native';

import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';
import StarRating from 'react-native-star-rating';

import API from '../config/API';
import Colors from '../config/Colors';
import Poster from './Poster';

export default class Movie extends React.Component {

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
        this.props.navigation.navigate({ routeName: 'Movie', params: { movie, title: movie.title }, key: movie.id });
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

    _renderSimilarMovies = () => {
        return (
            <View
                style={{
                    paddingVertical: 10,
                }}
            >
                <Text
                    style={[styles.title, { paddingHorizontal: 15 }]}
                >
                    Similar Movies
                </Text>

                <FlatList
                    horizontal={true}
                    data={this.state.similarMovies}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ width: 15 }} />
                        );
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ width: 15 }} />
                        );
                    }}
                    renderItem={this._renderItem}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `movie-similar-item-${index}`}
                />
            </View>
        );
    };

    _renderHeader = () => {
        const { width } = Dimensions.get('window');
        const { movie } = this.state;

        return (
            <ImageBackground
                style={{
                    width: width,
                    height: 250,
                    justifyContent: 'flex-end',
                    backgroundColor: Colors.brown,
                }}
                source={{ uri: `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` }}
            >
                <LinearGradient
                    colors={[Colors.transparent, Colors.brown]}
                    style={{
                        flex: 1,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        justifyContent: 'flex-end',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 38,
                            color: Colors.white,
                        }}
                    >
                        {movie.title}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 16,
                            color: Colors.white,
                        }}
                    >
                        {movie.tagline}
                    </Text>
                </LinearGradient>
            </ImageBackground>
        );
    };

    render() {
        const { movie } = this.state;

        return (
            <ScrollView
                style={styles.container}
            >
                {this._renderHeader()}

                <View
                    style={styles.detailBlock}
                >
                    <Text
                        style={styles.title}
                    >
                        Details
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.white,
                                fontSize: 12
                            }}
                        >
                            {moment(movie.release_date).format('MMMM Do YYYY')}
                        </Text>
                        <Text
                            style={{
                                color: Colors.white,
                                fontSize: 12
                            }}
                        >
                            {`${movie.runtime} mins`}
                        </Text>
                    </View>
                </View>




                <View
                    style={styles.detailBlock}
                >
                    <Text
                        style={styles.title}
                    >
                        Rating
                    </Text>
                    <StarRating
                        disabled={true}
                        starSize={32}
                        maxStars={10}
                        emptyStarColor={Colors.white}
                        fullStarColor={Colors.white}
                        emptyStarColor={Colors.white}
                        rating={movie.vote_average}
                        containerStyle={{
                            alignItems: 'center',
                        }}
                    />
                </View>




                <View
                    style={styles.detailBlock}
                >
                    <Text
                        style={styles.title}
                    >
                        Synopsis
                    </Text>
                    <Text
                        style={styles.description}
                    >
                        {movie.overview}
                    </Text>
                </View>

                {this._renderSimilarMovies()}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.brown,
    },
    detailBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        color: Colors.white,
        fontSize: 22,
        paddingBottom: 10,
    },
    description: {
        color: Colors.white,
        fontSize: 12,
    },
});