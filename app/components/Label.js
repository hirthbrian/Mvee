import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Label extends React.Component {
  constructor(props) {
    super(props);

    let weight;
    switch (props.fontWeight) {
      case 200:
        weight = '-extra-light';
        break;
      case 400:
        weight = '';
        break;
      case 600:
        weight = '-semi-bold';
        break;
      default:
        weight = '';
    }
    this.weight = weight;
  }

  render() {
    const {
      style,
      children,
    } = this.props;
    return (
      <Text
        {...this.props}
        style={[style, { fontFamily: `plex${this.weight}` }]}
      >
        {children}
      </Text>
    );
  }
}

Label.propTypes = {
  fontWeight: PropTypes.number,
};

Label.defaultProps = {
  fontWeight: 400,
};
