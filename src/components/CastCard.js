import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Colors from '../config/Colors';
import Label from './Label';
import Touchable from './Touchable'

class CastCard extends React.Component {
  goToCast = () => {
    const {
      id,
      name,
      navigation: {
        navigate
      },
    } = this.props;
    navigate({ routeName: 'Cast', params: { id, name }, key: id });
  }

  render() {
    const { width } = Dimensions.get('window');

    const {
      name,
      job,
      character,
      picture
    } = this.props;

    return (
      <View
        style={{
          width: width / 5,
        }}
      >
        <Touchable
          onPress={this.goToMovie}
          containerStyle={{
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          <Image
            style={{
              width: width / 5,
              height: (width / 5) * 1.5,
              justifyContent: 'flex-end',
            }}
            source={{ uri: picture }}
          />
        </Touchable>
        <View
          style={{
            paddingVertical: 2,
            paddingHorizontal: 5,
          }}
        >
          <Label
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: Colors.black,
            }}
            numberOfLines={2}
          >
            {name}
          </Label>
          <Label
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: Colors.lightBlack,
            }}
            numberOfLines={1}
          >
            {character}
          </Label>
        </View>
      </View>
    );

    return (
      <Touchable
        onPress={this.goToCast}
      >
        <View
          style={{
            width: width / 5,
          }}
        >
          <ImageBackground
            style={{
              width: width / 5,
              height: (width / 5) * 1.55,
            }}
            source={{ uri: picture }}
          >
            <Label
              fontWeight={600}
              style={{
                padding: 5,
                fontSize: 12,
                color: Colors.white,
              }}
            >
              {name}
            </Label>
          </ImageBackground>

          <Label
            numberOfLines={2}
            style={{
              padding: 5,
              fontSize: 10,
              color: Colors.white,
            }}
          >
            {character || job}
          </Label>
        </View>
      </Touchable>
    );
  };
}

export default withNavigation(CastCard);
