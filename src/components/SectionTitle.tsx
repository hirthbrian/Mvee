import React from 'react';
import {
  Text,
} from 'react-native';
import { Color } from '../utils';

function SectionTitle({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 30,
        color: Color.Black,
        paddingTop: 25,
        paddingBottom: 15,
        paddingHorizontal: 10,
        fontFamily: 'metropolis-bold',
      }}
    >
      {title}
    </Text>
  );
}

export default SectionTitle;
