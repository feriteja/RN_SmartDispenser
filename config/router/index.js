import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import adminSection from './admin';
import userSection from './user';
import adminLogin from '../../src/screens/main/adminLoginScreen';
import adminRegister from '../../src/screens/admin/adminRegister';
import mainScreen from '../../src/screens/main/mainScreen';
import userLogin from '../../src/screens/main/userLoginScreen';

import {useDispatch} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import {withFirebase} from '../firebase/firebaseContext';

const Stack = createStackNavigator();

function index(props) {
  const [Role, setRole] = useState(null);
  const typeState = useSelector((state) => state.authReducer.type);
  const dispatch = useDispatch();

  let bawaEmail = props.firebase.auth.currentUser
    ? props.firebase.auth.currentUser.email
    : '';

  useEffect(() => {
    props.firebase.doCheckuserRole().then((a) => {
      setRole(a);

      dispatch({type: 'LOGINADMINUSER', payload: a});
    });

    return () => {
      // props.firebase.doStopCheckuserRole();
    };
  }, [typeState]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {Role == null ? (
          <>
            <Stack.Screen name="mainScreen" component={mainScreen} />
            <Stack.Screen name="adminLogin" component={adminLogin} />
            <Stack.Screen name="userLogin" component={userLogin} />
            <Stack.Screen name="adminRegister" component={adminRegister} />
          </>
        ) : Role == 'admin' ? (
          <>
            <Stack.Screen name="adminSection" component={adminSection} />
          </>
        ) : (
          <>
            <Stack.Screen name="userSection" component={userSection} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withFirebase(index);
