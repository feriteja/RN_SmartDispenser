import React from 'react';
import {View, Text, Alert, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import userMain from '../../src/screens/user/mainScreen';
import userHistory from '../../src/screens/user/historyUser';
import {useDispatch} from 'react-redux';
import {withFirebase} from '../firebase/firebaseContext';

const Tab = createBottomTabNavigator();

function user(props) {
  const dispatch = useDispatch();

  const logout = () =>
    Alert.alert(
      'Logout',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch({type: 'LOGOUTADMINUSER'});
            props.firebase.logOutUserAdmin();
          },
        },
      ],
      {cancelable: false},
    );

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0f52FD',
        labelStyle: {fontSize: 12},
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          ),
        }}
        name="userMain"
        component={userMain}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'My Data',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              color={color}
              size={32}
            />
          ),
        }}
        name="userHistory"
        component={userHistory}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={32} />
          ),
        }}
        name="longout"
        component={mencobaTab}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            logout();
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default withFirebase(user);

const mencobaTab = () => (
  <View>
    <Text>halo</Text>
  </View>
);
