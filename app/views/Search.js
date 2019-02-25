import React from 'react';
import {
  View,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../config/Colors';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

class Search extends React.Component {
  renderItem = ({ item }) => (
    <MovieCard
      id={item.id}
      title={item.title}
      year={item.year}
      poster={item.poster}
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
          width: 128,
          height: 128,
        }}
      />
    </View>
  )

  render() {
    const { searchResults } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.blue,
        }}
      >
        <SearchBar />
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
          }}
          numColumns={3}
          data={searchResults}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmpty}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ search, movies }) => ({
  searchResults: search.results,
});

export default connect(mapStateToProps, {})(Search)