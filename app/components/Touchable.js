import React from 'react';
import {
    TouchableWithoutFeedback,
} from 'react-native';

import { View as AView } from 'react-native-animatable';

export default class Touchable extends React.Component {

    constructor(props) {
        super(props);

        this.touchableRef = null;
    }

    onPressIn = () => {
        this.touchableRef.transitionTo({ scale: 0.9 });
    };

    onPressOut = () => {
        this.touchableRef.transitionTo({ scale: 1 });
    };

    render() {

        return (
            <TouchableWithoutFeedback
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
                style={this.props.containerStyle}
                {...this.props}
            >
                <AView
                    ref={(ref) => { this.touchableRef = ref }}
                >
                    {this.props.children}
                </AView>
            </TouchableWithoutFeedback>
        );
    }

}