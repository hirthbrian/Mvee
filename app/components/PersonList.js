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
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    this.state = {
      creditWidth: width / 5,
      creditHeight: (width / 5) * 1.55,
    };
  }

  renderItem = (data) => {
    const credit = data.item;

    return (
      <Touchable
        onPress={this.props.onPress(credit)}
      >
        <View
          style={{
            width: this.state.creditWidth,
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              borderRadius: 4,
              width: this.state.creditWidth,
              height: this.state.creditHeight,
              backgroundColor: Colors.brown,
            }}
            source={{ uri: `https://image.tmdb.org/t/p/w185/${credit.profile_path}` }}
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
            {credit.name}
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
            {credit.character || credit.job}
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
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
};
