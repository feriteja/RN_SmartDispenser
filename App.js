import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import Navigation from './config/router';
import FirebaseContext from './config/firebase/firebaseContext';
import FirebaseInstance from './config/firebase/firebaseInstance';
import {Provider} from 'react-redux';
import Store from './config/redux/store/store';
import {withFirebase} from './config/firebase/firebaseContext';
import {notifMan} from './config/Notification/NotificationManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.notify = null;
    notifMan.configure;
  }

  componentDidMount() {}

  render() {
    return (
      <FirebaseContext.Provider value={new FirebaseInstance()}>
        <Provider store={Store}>
          <View style={{flex: 1}}>
            <Navigation />
          </View>
        </Provider>
      </FirebaseContext.Provider>
    );
  }
}

export default withFirebase(App);

const styles = StyleSheet.create({});
