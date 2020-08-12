import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function mainScreen(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('adminLogin')}>
        <Text style={styles.textButton}>ADMIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('userLogin')}>
        <Text style={styles.textButton}>USER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 40,
    marginTop: 40,
    width: 120,
    height: 60,
    padding: 20,
    borderWidth: 0.3,
    borderColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
