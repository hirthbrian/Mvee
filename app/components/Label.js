import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Label extends React.Component {
  constructor(props) {
    super(props);

    let weight;
    switch (props.fontWeight) {
      case 100:
        weight = '-Thin';
        break;
      case 200:
        weight = '-ExtraLight';
        break;
      case 300:
        weight = '-Light';
        break;
      case 400:
        weight = '';
        break;
      case 500:
        weight = '-Medium';
        break;
      case 600:
        weight = '-SemiBold';
        break;
      case 700:
        weight = '-Bold';
        break;
      default:
        weight = '';
    }
    this.weight = weight;
  }

  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: `IBMPlexSans${this.weight}` }]}
      >
        {this.props.children}
      </Text>
    );
  }
}

Label.propTypes = {
  // style: PropTypes.object,
  fontWeight: PropTypes.number,
};

Label.defaultProps = {
  // style: {},
  fontWeight: 400,
};
