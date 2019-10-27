import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from './styles';
import SectionTitle from '../SectionTitle';

const Summary = ({ content }: { content: string }) => (
  <View
    style={styles.detailBlock}
  >
    <SectionTitle title="Summary" />

    <Text
      style={styles.description}
    >
      {content}
    </Text>
  </View>
);

export default Summary;
