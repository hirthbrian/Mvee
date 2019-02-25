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
import {
  fromBottom,
} from 'react-navigation-transitions'
import Colors from './Colors';
import Search from '../views/Search';
import Movie from '../views/Movie';
import Person from '../views/Person';
import Home from '../views/Home';

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (nextScene.route.routeName === 'Search') {
    return fromBottom();
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Mvee',
      headerTintColor: Colors.white,
      headerBackTitle: null,
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
      headerRightContainerStyle: {
        paddingRight: 10,
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
      headerRight: (
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 25,
            height: 25,
          }}
        />
      )
    }),
  },
  Search: {
    screen: Search,
    navigationOptions: () => ({
      header: null
    })
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
    transitionConfig: (nav) => handleCustomTransition(nav),
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
