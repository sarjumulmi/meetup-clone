import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MeetupApi } from './../../../constants/api';
import { LoadingScreen } from './../../commons';
import styles from './styles/HomeScreen';

const meetupApi = new MeetupApi();

class HomeScreen extends Component {
  static defaultProps = {
    meetupApi
  }

  state = {
    loading: false,
    meetups: []
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const meetups = this.props.meetupApi.fetchGroupMeetups();
    this.setState({ loading: false, meetups });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text>HomeScreen</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text>HomeScreen</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;