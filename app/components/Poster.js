import React from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    ImageBackground
} from 'react-native';

import Colors from '../config/Colors';
import LinearGradient from 'react-native-linear-gradient';

import Touchable from './Touchable';

export default class Poster extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount() {
    }

    render() {
        const { title, year, posterUrl, onPress } = this.props;
        const { width } = Dimensions.get('window');

        const posterWidth = (width - (4 * 3)) / 3;
        const posterHeight = posterWidth * 1.55;

        return (
            <Touchable
                onPress={onPress}
                containerStyle={{
                    margin: 2,
                    overflow: 'hidden',
                    borderRadius: 2,
                }}
            >

                <ImageBackground
                    style={{
                        width: posterWidth,
                        height: posterHeight,
                        backgroundColor: Colors.blue
                    }}
                    source={{ uri: posterUrl }}
                >
                    <LinearGradient
                        colors={[Colors.transparent, Colors.transparent, Colors.black]}
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end'
                        }}
                    >
                        <Text
                            style={{
                                padding: 5,
                                fontSize: 12,
                                color: Colors.white,
                            }}
                        >
                            {`${title} (${year})`}
                        </Text>
                    </LinearGradient>
                </ImageBackground>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
});