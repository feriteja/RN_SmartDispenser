import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {notifMan} from '../../config/Notification/NotificationManager';

export default function adminItemDispenserDisplay(props) {
  const [TrigerNotifHampir, setTrigerNotifHampir] = useState(true);
  const [TrigerNotifHabis, setTrigerNotifHabis] = useState(true);

  const fase1 = 4;
  const fase2 = 2;
  const fase3 = 1;
  const fase4 = 0;

  useEffect(() => {
    if (
      props.kuantitas <= fase1 &&
      props.kuantitas >= fase2 &&
      TrigerNotifHampir
    ) {
      notifMan.buildNotification(
        1,
        `${props.namaGedung} `,
        'Segera isi ulang ',
        'hampir habis',
      );
      setTrigerNotifHampir(false);
    } else if (
      props.kuantitas <= fase3 &&
      props.kuantitas >= fase4 &&
      TrigerNotifHabis
    ) {
      notifMan.buildNotification(
        1,
        `${props.namaGedung} `,
        'isi galon telah habis',
        'habis',
      );
      setTrigerNotifHabis(false);
    } else {
    }

    return () => {};
  }, [props.kuantitas]);

  return (
    <View
      style={{
        height: 230,
        width: 150,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
      }}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          marginTop: 10,
          marginRight: 15,
          marginBottom: 10,
        }}
        onPress={() => props.deletePath(props.origin)}>
        <Text> - </Text>
      </TouchableOpacity>
      <View
        style={{
          width: 100,
          height: 150,
          alignSelf: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 20,
            position: 'absolute',
            elevation: 33,
            top: '50%',
          }}>
          {Math.floor((props.kuantitas / 100) * 19000)} mL
        </Text>
        <View
          style={{
            backgroundColor: '#4aF2FD',
            height: (150 * props.kuantitas) / 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View>
      <Text style={{marginTop: 10}}>{props.namaGedung}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
