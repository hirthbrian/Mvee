import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { withNavigation } from 'react-navigation';
import Colors from '../config/Colors';
import Label from './Label';
import Touchable from './Touchable'

class PersonCard extends React.Component {
  goToPerson = () => {
    const {
      id,
      name,
      navigation: {
        navigate
      },
    } = this.props;
    navigate({ routeName: 'Person', params: { id, name }, key: id });
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
      <Touchable
        onPress={this.goToPerson}
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
              backgroundColor: Colors.blue,
            }}
            source={{ uri: picture }}
          >
            <LinearGradient
              colors={[Colors.transparent, Colors.transparent, Colors.black]}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
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
            </LinearGradient>
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

export default withNavigation(PersonCard)