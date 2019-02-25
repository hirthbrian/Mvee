import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../config/Colors';
import PersonCard from './PersonCard';
import Label from './Label';

export default class PersonList extends React.Component {
  renderItem = ({ item }) => {
    const {
      id,
      name,
      job,
      character,
      picture
    } = item;

    return (
      <PersonCard
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
            color: Colors.white,
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

PersonList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};
