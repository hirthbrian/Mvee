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
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    this.state = {
      videoWidth: width / 2,
      videoHeight: (width / 2) / 1.77,
    };
  }

  renderItem = (data) => {
    const video = data.item;

    return (
      <Touchable
        onPress={() => {
          Linking.openURL(`https://www.youtube.com/watch?v=${video.key}`);
        }}
      >
        <Image
          style={{
            width: this.state.videoWidth,
            height: this.state.videoHeight,
            borderRadius: 4,
            justifyContent: 'flex-end',
          }}
          source={{ uri: `https://img.youtube.com/vi/${video.key}/hqdefault.jpg` }}
        />
      </Touchable>
    );
  }

  render() {
    return (
      this.props.data.length > 0 &&
      <View>
        <Label
          fontWeight={200}
          style={{
            fontSize: 28,
            color: Colors.white,
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
          keyExtractor={(item, index) => `video-${index}`}
        />
      </View>
    );
  }
}

VideoList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
