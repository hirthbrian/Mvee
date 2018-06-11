import React from 'react';
import {
    View,
    ImageBackground,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Colors from './Colors';

import MovieList from '../components/MovieList';
import MovieDetails from '../components/MovieDetails';

export default RootStack = createStackNavigator({
    MovieList: {
        screen: MovieList,
        navigationOptions: ({ navigation }) => ({
            title: 'Mvee',
            headerStyle: {
                backgroundColor: Colors.green,
            },
        })
    },
    MovieDetails: {
        screen: MovieDetails,
        navigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            headerBackground: <View style={{ flex: 1, backgroundColor: 'transparent' }} />,
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