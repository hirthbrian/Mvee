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
import Movie from '../views/Movie';
import Cast from '../views/Cast';
import Home from '../views/Home';

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image
          style={{
            width: 35,
            height: 35,
          }}
          source={require('../assets/logo.png')}
        />
      ),
      headerTintColor: Colors.lightBlack,
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={navigation.getParam('onSearchPress')}
        >
          <Image
            source={require('../assets/img/glass.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.red,
            }}
          />
        </TouchableWithoutFeedback>
      ),
    }),
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
  Cast: {
    screen: Cast,
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
