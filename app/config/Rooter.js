import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Colors from './Colors';
import Movie from '../components/Movie';
import Person from '../components/Person';
import Home from '../components/Home';
import SearchBar from '../components/SearchBar';

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Mvee',
      headerLeft: (
        <SearchBar
          onSearch={navigation.state.params && navigation.state.params.onSearch}
        />
      ),
      headerStyle: {
        backgroundColor: Colors.red,
        paddingHorizontal: 10,
      },
    }),
  },
  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTransparent: true,
      headerBackground: <View style={{ flex: 1, backgroundColor: Colors.transparent }} />,
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
      },
    }),
  },
  Person: {
    screen: Person,
    navigationOptions: () => ({
      headerTransparent: true,
      headerBackground: <View style={{ flex: 1, backgroundColor: Colors.transparent }} />,
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
      },
    }),
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    headerTintColor: Colors.white,
    headerBackTitleStyle: {
      color: Colors.white,
      fontFamily: 'IBMPlexSans',
    },
    headerTitleStyle: {
      color: Colors.white,
      fontFamily: 'IBMPlexSans',
    },
  },
});
export default RootStack;
