import React from 'react';
import {
  View,
  Image,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../config/Colors';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

class Search extends React.Component {
  renderItem = ({ item }) => (
    <MovieCard
      id={item.id}
      title={item.title}
      year={item.year}
      poster={item.poster}
      rounded={false}
    />
  );

  renderEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/logo.png')}
        style={{
          width: 64,
          height: 64,
          opacity: 0.8,
        }}
      />
    </View>
  )

  render() {
    const {
      loading,
      searchResults,
    } = this.props;

    if (loading) return <Loading />

    return (
      <FlatList
        style={{
          backgroundColor: Colors.blue,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        numColumns={3}
        data={searchResults}
        renderItem={this.renderItem}
        ListEmptyComponent={this.renderEmpty}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const mapStateToProps = ({ search }) => ({
  searchResults: search.results,
  loading: search.loading,
});

export default connect(mapStateToProps, {})(Search)