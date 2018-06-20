import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';
import moment from 'moment';
import API from '../config/API';
import Colors from '../config/Colors';
import Label from './Label';
import MovieList from './MovieList';

export default class Person extends React.Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');

    this.state = {
      person: {},
      credits: [],
      creditWidth: width / 3,
      creditHeight: (width / 3) * 1.55,
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    API.getPerson(params.person.id, (result) => {
      this.setState({ person: result }, () => {
        API.getPeopleCredits(result.id, (credits) => {
          this.setState({ credits: credits.cast });
        });
      });
    });
  }

  goToDetails = movie => () => {
    this.props.navigation.navigate({ routeName: 'Movie', params: { movie, title: movie.title }, key: movie.id });
  }

  render() {
    const { person } = this.state;

    return (
      <ScrollView
        style={{
          backgroundColor: Colors.blue,
        }}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.blue}
        />
        <Label
          fontWeight={200}
          style={{
            fontSize: 38,
            textAlign: 'center',
            color: Colors.white,
            padding: 10,
          }}
        >
          {person.name}
        </Label>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}
        >
          <Image
            style={{
              alignSelf: 'center',
              borderRadius: 4,
              width: this.state.creditWidth,
              height: this.state.creditHeight,
              backgroundColor: Colors.blue,
            }}
            source={{ uri: `https://image.tmdb.org/t/p/w500/${person.profile_path}` }}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Label
                style={{
                  color: Colors.white,
                }}
              >
                {person.birthday && moment(person.birthday).format('MMMM Do YYYY')}
              </Label>
              <Label
                style={{
                  color: Colors.white,
                }}
              >
                {person.deathday && moment(person.deathday).format('MMMM Do YYYY')}
              </Label>
            </View>
          </View>
        </View>

        <Label
          style={{
            padding: 10,
            color: Colors.white,
          }}
        >
          {person.biography}
        </Label>

        <MovieList
          title="Credits"
          data={this.state.credits}
          onPress={this.goToDetails}
        />

      </ScrollView>
    );
  }
}
