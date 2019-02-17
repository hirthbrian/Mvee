import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from './Colors';
import Movie from '../components/Movie';
import Person from '../components/Person';
import Home from '../components/Home';
import SearchBar from '../components/SearchBar';
import Label from '../components/Label';

const HEADER_HEIGHT = 70;

const header = (left, title, right) => {
  return (
    ({ navigation }) => ({
      header: (
        <View
          style={{
            height: HEADER_HEIGHT,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexDirection: 'row',
            paddingBottom: 10,
            paddingHorizontal: 15,
            backgroundColor: Colors.red,
          }}
        >
          {left &&
            <SearchBar
              onSearch={navigation.state.params && navigation.state.params.onSearch}
            />
          }

          <Label
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: 'center',
              paddingHorizontal: 15,
              color: Colors.white,
              fontSize: 20,
            }}
          >
            {title}
          </Label>

          <View style={{ height: 20, width: 20 }} />

        </View>
      ),
    })
  );
};

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: header(true, 'mvee'),
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
      fontFamily: 'plex',
    },
    headerTitleStyle: {
      color: Colors.white,
      fontFamily: 'plex',
    },
  },
});
export default RootStack;
