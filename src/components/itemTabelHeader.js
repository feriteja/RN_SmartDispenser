import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function itemTabelHeader(props) {
  const weekday = new Array(7);
  weekday[0] = 'Minggu';
  weekday[1] = 'Senin';
  weekday[2] = 'Selasa';
  weekday[3] = 'Rabu';
  weekday[4] = 'Kamis';
  weekday[5] = 'Jumat';
  weekday[6] = 'Sabtu';

  const DateTime = new Date(props.tanggal * 1000);

  const formatTime =
    DateTime.getDate() +
    '/' +
    parseInt(DateTime.getMonth() + 1) +
    '/' +
    DateTime.getFullYear() +
    '/' +
    weekday[DateTime.getDay()] +
    ' -- ' +
    DateTime.getHours() +
    ':' +
    DateTime.getMinutes() +
    ':' +
    DateTime.getSeconds();

  return (
    <View style={styles.itemTabelHeader}>
      <View style={styles.textTabelItem}>
        <Text>{formatTime}</Text>
      </View>
      <View style={styles.textTabelSeparator}>
        <Text>||</Text>
      </View>
      <View style={styles.textTabelItem}>
        <Text>{props.consumed}mL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTabelHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    elevation: 0.5,
    borderBottomWidth: 0.2,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    marginVertical: 3,
  },
  textTabelItem: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTabelSeparator: {
    alignItems: 'center',
    justifyContent: 'center',

    flex: 1,
  },
});
