import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';

import {withFirebase} from '../../../config/firebase/firebaseContext';
import {useDispatch} from 'react-redux';

const LoadingLogin = (props) => {
  return (
    <View
      style={{
        flex: 1,
        opacity: 0.8,
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={'#fff'} />
    </View>
  );
};

function adminRegister(props) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const [ErrMessage, setErrMessage] = useState(null);
  const role = 'admin';

  const dispatch = useDispatch();

  const userAdminRegis = async () => {
    try {
      const authStat = await props.firebase.RegisterUserAdmin(
        Email,
        Password,
        role,
      );
      setLoading(false);

      authStat == 'berhasil'
        ? dispatch({type: 'LOGINADMINUSER', payload: 'admin'})
        : setErrMessage(
            'The email address is already in use by another account',
          );
    } catch (error) {
      console.log('ini eror', error);
    }
  };

  return (
    <View style={styles.container}>
      {Loading ? <LoadingLogin /> : <View />}
      <View style={styles.card}>
        <Text style={{fontSize: 30, marginBottom: 30}}> ADMIN REGISTER </Text>
        {ErrMessage && (
          <Text style={{textAlign: 'center', fontSize: 15, color: '#f00'}}>
            {ErrMessage}
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoading(true);
            userAdminRegis();
          }}>
          <Text style={{fontSize: 20}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withFirebase(adminRegister);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#E3F2FD',
    marginTop: 20,
    borderRadius: 20,
    width: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c9c9c9',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderWidth: 0.1,
    elevation: 0.31,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  input: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
    width: 200,
    fontSize: 17,
  },
});
