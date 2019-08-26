import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../config/Colors';
import CastCard from './CastCard';
import Label from './Label';

export default class CastList extends React.Component {
  renderItem = ({ item }) => {
    const {
      id,
      name,
      job,
      character,
      picture
    } = item;

    return (
      <CastCard
        id={id}
        name={name}
        job={job}
        character={character}
        picture={picture}
      />
    );
  };

  render() {
    const { title } = this.props;
    return (
      <View>
        <Label
          fontWeight={200}
          style={{
            fontSize: 28,
            color: Colors.lightBlack,
            padding: 10,
          }}
        >
          {title}
        </Label>
        <FlatList
          horizontal
          data={this.props.data}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ width: 10 }} />}
          ListFooterComponent={() => <View style={{ width: 10 }} />}
          ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

CastList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};
