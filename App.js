import React from 'react';
import { YellowBox, View, StatusBar } from 'react-native'

import Rooter from './app/config/Rooter';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true} />
                <Rooter />
            </View>
        );
    }
}