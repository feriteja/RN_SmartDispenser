import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {withFirebase} from '../../../config/firebase/firebaseContext';

function registeringUser(props) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [RFID, setRFID] = useState('');
  const [Password, setPassword] = useState('');
  const role = 'user';

  const userAdminRegis = () => {
    props.firebase.RegisterUserOrdinary(Email, Password, role, RFID, Name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={{fontSize: 30, marginBottom: 30}}> USER REGISTER </Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => setName(text)}
          value={Name}
        />
        <TextInput
          style={styles.input}
          placeholder="ID RFID"
          onChangeText={(text) => setRFID(text)}
          value={RFID}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          value={Email}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={Password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => userAdminRegis()}>
          <Text style={{fontSize: 20}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withFirebase(registeringUser);

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
