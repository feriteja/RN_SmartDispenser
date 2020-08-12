import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {withFirebase} from '../../../config/firebase/firebaseContext';

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

function adminLoginScreen(props) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const dispatch = useDispatch();

  const Login = () => {
    setIsLoading(true);
    props.firebase
      .loginUserAdmin(Email, Password)
      .then((a) => {
        console.log(a);
        setIsLoading(false);
        dispatch({type: 'LOGINADMINUSER', payload: 'admin'});
      })
      .catch((err) => {
        setIsLoading(false);
        setErrMsg(
          'The password is invalid or the user does not have a password',
        );
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingLogin /> : <View />}
      <View style={styles.card}>
        <Text style={{fontSize: 30, marginBottom: 30}}> ADMIN LOGIN </Text>
        {ErrMsg && (
          <Text style={{textAlign: 'center', fontSize: 15, color: '#f00'}}>
            {ErrMsg}
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => Login()}>
          <Text style={{fontSize: 20}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('adminRegister')}>
          <Text style={{color: '#8AA29E', marginTop: 20}}>
            don't have account ?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withFirebase(adminLoginScreen);

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
