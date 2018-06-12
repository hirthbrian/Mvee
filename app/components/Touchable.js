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
        this.touchableRef.transitionTo({ scale: 0.9, opacity: 0.75 });
    };

    onPressOut = () => {
        this.touchableRef.transitionTo({ scale: 1, opacity: 1 });
    };

    render() {

        return (
            <TouchableWithoutFeedback
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
                {...this.props}
            >
                <AView
                    ref={(ref) => { this.touchableRef = ref }}
                    style={this.props.containerStyle}
                >
                    {this.props.children}
                </AView>
            </TouchableWithoutFeedback>
        );
    }

}