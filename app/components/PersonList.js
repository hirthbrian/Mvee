import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../config/Colors';
import Label from './Label';
import Touchable from './Touchable';

export default class PersonList extends React.Component {
  renderItem = ({item}) => {
    const { width } = Dimensions.get('window');

    const {
      id,
      name,
      job,
      character,
      picture
    } = item;

    return (
      <Touchable
        onPress={this.props.onPress(id)}
      >
        <View
          style={{
            width: width / 5,
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              borderRadius: 4,
              width: width / 5,
              height: (width / 5) * 1.55,
              backgroundColor: Colors.brown,
            }}
            source={{ uri: picture }}
          />

          <Label
            fontWeight={600}
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: Colors.white,
              paddingTop: 5,
            }}
            numberOfLines={2}
          >
            {name}
          </Label>
          <Label
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: Colors.white,
              paddingBottom: 5,
            }}
            numberOfLines={2}
          >
            {character || job}
          </Label>
        </View>
      </Touchable>
    );
  };

  render() {
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
          {this.props.title}
        </Label>
        <FlatList
          horizontal
          data={this.props.data}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <View style={{ width: 10 }} />}
          ListFooterComponent={() => <View style={{ width: 10 }} />}
          ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          keyExtractor={(item, index) => `movie-${index}`}
        />
      </View>
    );
  }
}

PersonList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  onPress: PropTypes.func.isRequired,
};
