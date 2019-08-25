import React from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  Image,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../config/Colors';
import Label from './Label';
import Touchable from './Touchable';

export default class VideoList extends React.Component {
  renderItem = ({ item }) => {
    const { width } = Dimensions.get('window');

    return (
      <Touchable
        onPress={() => {
          Linking.openURL(item.url);
        }}
      >
        <Image
          style={{
            width: width / 2,
            height: (width / 2) / 1.77,
            borderRadius: 4,
          }}
          source={{ uri: item.thumbnail }}
        />
      </Touchable>
    );
  }

  render() {
    const { data } = this.props;

    if (!data || data.length === 0) return null

    return (
      <View>
        <Label
          fontWeight={200}
          style={{
            fontSize: 28,
            color: Colors.black,
            padding: 10,
          }}
        >
          Videos
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

VideoList.propTypes = {
  data: PropTypes.array,
};
