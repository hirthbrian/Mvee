import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import Colors from './Colors';
import Search from '../views/Search';
import Movie from '../views/Movie';
import Person from '../views/Person';
import Home from '../views/Home';
import SearchBar from '../components/SearchBar';

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Mvee',
      headerTintColor: Colors.white,
      headerBackTitle: 'Home',
      headerStyle: {
        backgroundColor: Colors.red,
      },
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'plex-semi-bold'
      },
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Search')}
        >
          <Image
            source={require('../../assets/img/glass.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.white,
            }}
          />
        </TouchableWithoutFeedback>
      ),
    }),
  },
  Search: {
    screen: Search,
    navigationOptions: ({ navigation }) => ({
      header: <SearchBar onPress={() => navigation.goBack()} />,
      headerTintColor: Colors.white,
      headerBackTitle: 'Search',
    })
  },
  Movie: {
    screen: Movie,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerBackground: <View style={{ flex: 1, backgroundColor: Colors.transparent }} />,
      headerTintColor: Colors.white,
      headerBackTitle: navigation.getParam('title'),
      headerTruncatedBackTitle: navigation.getParam('title').slice(0, 10) + '...',
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
      },
    }),
  },
  Person: {
    screen: Person,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerBackground: <View style={{ flex: 1, backgroundColor: Colors.transparent }} />,
      headerTintColor: Colors.white,
      headerBackTitle: navigation.getParam('name'),
      headerTruncatedBackTitle: navigation.getParam('name').slice(0, 10) + '...',
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
      },
    }),
  },
}, {
    headerMode: 'screen',
    // transitionConfig: (nav) => handleCustomTransition(nav),
    navigationOptions: {
      headerTintColor: Colors.white,
      headerBackTitleStyle: {
        color: Colors.white,
        fontFamily: 'plex',
      },
      headerTitleStyle: {
        color: Colors.white,
        fontFamily: 'plex',
      },
    },
  });
export default createAppContainer(RootStack);
