import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Color } from '../../utils';
import Touchable from '../Touchable';

function CastItem({
  id,
  actorName,
  characterName,
  picture,
}: {
  id: number,
  actorName: string,
  characterName: string,
  picture: string,
}) {
  const { navigate } = useNavigation();
  const { width } = Dimensions.get('window');

  return (
    <Touchable
      onPress={() => navigate({ routeName: 'Cast', params: { id } })}
    >
      <View
        style={{
          width: width / 4,
        }}
      >
        <Image
          style={{
            width: width / 4,
            height: (width / 4) * 1.5,
            borderRadius: 4,
          }}
          source={{ uri: picture }}
        />
        <View
          style={{
            paddingVertical: 2,
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: Color.Black,
            }}
            numberOfLines={2}
          >
            {actorName}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: Color.LightBlack,
            }}
            numberOfLines={1}
          >
            {characterName}
          </Text>
        </View>
      </View>
    </Touchable>
  );
}

export default CastItem;
