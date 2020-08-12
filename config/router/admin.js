import React from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import adminMain from '../../src/screens/admin/mainScreen';
import adimRegisteringUser from '../../src/screens/admin/registeringUser';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesomeFive from 'react-native-vector-icons/FontAwesome5';

import {withFirebase} from '../firebase/firebaseContext';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

function admin(props) {
  return (
    <Drawer.Navigator
      drawerStyle={{
        // backgroundColor: '#c6cbef',
        width: 260,
      }}
      drawerContent={(prop) => <MyCustom {...props} {...prop} />}>
      <Drawer.Screen name="adminMain" component={adminMain} />
      <Drawer.Screen name="adminRegisUser" component={adimRegisteringUser} />
      {/* <Drawer.Screen modal name="logoutadmin" /> */}
    </Drawer.Navigator>
  );
}

export default withFirebase(admin);

const MyCustom = (props) => {
  const dispatch = useDispatch();
  return (
    <View>
      <View
        style={{
          backgroundColor: '#4aF2FD',
          height: 200,
          padding: 10,
          alignItems: 'center',
        }}>
        <FontAwesomeFive name="user-tie" size={120} />
        <View style={{position: 'absolute', bottom: 10, left: 10}}>
          <Text style={{fontWeight: 'bold'}}>Wellcome</Text>
          <Text>you have logged as admin</Text>
        </View>
      </View>
      <View style={{padding: 10}}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => props.navigation.navigate('adminMain')}>
          <IconMaterial name="home" size={24} />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => props.navigation.navigate('adminRegisUser')}>
          <FontAwesome name="user-plus" size={24} />
          <Text>Register User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            // props.firebase.logOutUserAdmin();
            // dispatch({type: 'LOGOUTADMINUSER'});
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
          }}>
          <IconMaterial name="logout" size={24} />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navItem: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 0.3,
    paddingLeft: 20,
    borderBottomColor: 'rgba(0,0,0,.1)',
  },
});
