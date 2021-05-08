import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, Header } from 'react-navigation-stack';
import { Color } from '../utils';
import Movie from './Movie';
import Cast from './Cast';
import Home from './Home';

const logoIcon = require('../assets/logo.png');
const searchIcon = require('../assets/img/search.png');
const moonIcon = require('../assets/img/sun.png');
const sun = require('../assets/img/moon.png');

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
          source={logoIcon}
        />
      ),
      headerTintColor: Color.White,
      headerStyle: {
        backgroundColor: Color.Red,
        borderBottomWidth: 0,
      },
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      // headerRightContainerStyle: {
      //   paddingRight: 10,
      // },
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={navigation.getParam('onSearchPress')}
        >
          <Image
            source={searchIcon}
            style={{
              width: 22,
              height: 22,
              tintColor: Color.White,
            }}
          />
        </TouchableWithoutFeedback>
      ),
      // headerRight: (
      //   <TouchableWithoutFeedback
      //     onPress={() => { }}
      //   >
      //     <Image
      //       source={moonIcon}
      //       style={{
      //         width: 25,
      //         height: 25,
      //         tintColor: Color.White,
      //       }}
      //     />
      //   </TouchableWithoutFeedback>
      // ),
    }),
  },
  Movie: {
    screen: Movie,
    navigationOptions: () => ({
      headerTransparent: true,
      headerTintColor: Color.Red,
    }),
  },
  Cast: {
    screen: Cast,
    navigationOptions: () => ({
      headerTintColor: Color.White,
      headerStyle: {
        backgroundColor: Color.Red,
        borderBottomWidth: 0,
      },
    }),
  },
});

export default createAppContainer(RootStack);
