import React from 'react';
import {
  TouchableWithoutFeedback,
} from 'react-native';
import { View as AView } from 'react-native-animatable';
import PropTypes from 'prop-types';

export default class Touchable extends React.Component {
  constructor(props) {
    super(props);

    this.touchableRef = null;
  }

  onPressIn = () => {
    this.touchableRef.transitionTo({ scale: 0.95, opacity: 0.5 }, 50);
  };

  onPressOut = () => {
    this.touchableRef.transitionTo({ scale: 1, opacity: 1 });
  };

  render() {
    const { onPress } = this.props;

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={onPress}
      >
        <AView
          ref={(ref) => { this.touchableRef = ref; }}
          style={this.props.containerStyle}
        >
          {this.props.children}
        </AView>
      </TouchableWithoutFeedback>
    );
  }
}

Touchable.propTypes = {
  children: PropTypes.element.isRequired,
  containerStyle: PropTypes.object,
};

Touchable.defaultProps = {
  containerStyle: {},
};
