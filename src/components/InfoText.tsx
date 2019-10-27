import React from 'react';
import { Text } from 'react-native';
import { Color } from '../utils';

function InfoText({
  infoTitle,
  infoContent,
}: {
  infoTitle: string,
  infoContent: string,
}) {
  return (
    <Text
      style={{
        paddingBottom: 3,
        paddingHorizontal: 10,
      }}
    >
      {`${infoTitle}: `}
      <Text
        style={{
          color: Color.LightBlack,
        }}
      >
        {infoContent}
      </Text>
    </Text>
  );
}

export default InfoText;
