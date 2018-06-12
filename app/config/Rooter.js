import React from 'react';
import {
    View,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Colors from './Colors';

import Movies from '../components/Movies';
import Movie from '../components/Movie';
import SearchBar from '../components/SearchBar';

export default RootStack = createStackNavigator({
    Movies: {
        screen: Movies,
        navigationOptions: ({navigation}) => ({
            title: 'Mvee',
            headerLeft: (
                <SearchBar
                    onSearch={navigation.state.params && navigation.state.params.onSearch}
                />
            ),
            headerStyle: {
                backgroundColor: Colors.blue,
            },
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
        })
    },
}, {
        navigationOptions: {
            headerTintColor: Colors.white,
            headerBackTitleStyle: {
                color: Colors.white
            },
            headerTitleStyle: {
                color: Colors.white
            }
        },
    }
);