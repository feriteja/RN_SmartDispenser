import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  Dimensions,
} from 'react-native';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import Slider from '@react-native-community/slider';
import {useDispatch} from 'react-redux';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {notifMan} from '../../../config/Notification/NotificationManager';

const {height, width} = Dimensions.get('screen');

function mainScreen(props) {
  const weekday = new Array(7);
  weekday[0] = 'Minggu';
  weekday[1] = 'Senin';
  weekday[2] = 'Selasa';
  weekday[3] = 'Rabu';
  weekday[4] = 'Kamis';
  weekday[5] = 'Jumat';
  weekday[6] = 'Sabtu';

  const [SliderAirReq, setSliderAirReq] = useState(0);
  const [AirType, setAirType] = useState('');
  const [myID, setmyID] = useState('');
  const dispatch = useDispatch();
  let getNotif;
  let checkRT;

  useEffect(() => {
    async function buatNotif() {
      const getID = await props.firebase.getUserCupRFID();
      setmyID(getID);

      checkRT = await props.firebase.db
        .ref(`/userCup/${getID}/history`)
        .on('value', (snap) => {
          snap.val() &&
            dispatch({
              type: 'UPDATE_HISTORY',
              payload: Object.values(snap.val()),
            });
        });

      getNotif = await props.firebase.db
        .ref(`/userCup/${getID}/history`)
        .orderByChild('time')
        .limitToLast(1)
        .on('child_added', (snap) => {
          const DateTime = new Date(snap.val().time * 1000);

          const formatTime =
            weekday[DateTime.getDay()] +
            ' -- ' +
            DateTime.getHours() +
            ':' +
            DateTime.getMinutes() +
            ':' +
            DateTime.getSeconds();

          notifMan.buildNotification(
            2,
            `Terakhir anda minum ${snap.val().waterUsage} mL`,
            `pada waktu ${formatTime}`,
            'Last Take',
          );
        });
    }
    buatNotif();

    return () => {
      props.firebase.db.ref(`/userCup/${myID}/history`).off('value', getNotif);
      props.firebase.db.ref(`/userCup/${myID}/history`).off('value', checkRT);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 16, alignSelf: 'center'}}>
          Wellcome USER: {props.firebase.auth.currentUser.email}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={{position: 'absolute', top: 10, left: '3%', fontSize: 19}}>
          id user :
        </Text>
        <Text
          style={{
            position: 'absolute',
            top: 10,
            left: '30%',
            fontSize: 19,
            fontWeight: 'bold',
          }}>
          {myID}
        </Text>
        <View
          style={{
            backgroundColor: '#4aF2FD',
            width: 200,
            height: (300 * SliderAirReq) / 4 / 100,
          }}></View>

        <Text
          style={{
            fontSize: 25,
            position: 'absolute',
            top: '50%',
            left: '38%',
          }}>
          {Math.ceil(SliderAirReq)} mL
        </Text>
      </View>

      <Slider
        style={{width: width * 0.8, height: 80}}
        minimumValue={0}
        maximumValue={400}
        minimumTrackTintColor="#0f52FD"
        maximumTrackTintColor="#000000"
        onValueChange={(val) => setSliderAirReq(val)}
        value={SliderAirReq}
      />

      <View style={styles.option}>
        <TouchableOpacity
          onPress={() => setAirType('panas')}
          style={{
            ...styles.optionButton,
            backgroundColor: 'rgba(255,52,3,.4)',
          }}>
          <Text style={{fontWeight: 'bold'}}> Panas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAirType('hangat')}
          style={{
            ...styles.optionButton,
            backgroundColor: 'rgba(255, 163, 0,.4)',
          }}>
          <Text style={{fontWeight: 'bold'}}>Hangat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAirType('normal')}
          style={styles.optionButton}>
          <Text style={{fontWeight: 'bold'}}>normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.firebase.doRequestWater(SliderAirReq, AirType)}
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <IconMaterial
            style={{
              borderWidth: 0.1,
              elevation: 0.1,
              borderRadius: 37 / 2,
              padding: 0,
            }}
            size={37}
            color="#9afafa"
            name="chevron-right-circle"
          />
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withFirebase(mainScreen);

const styles = StyleSheet.create({
  card: {
    height: 400,
    width: width * 0.7,
    backgroundColor: '#fbfbfb',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 10,
    borderRadius: 0.5,
    borderWidth: 0.05,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    elevation: 0.6,
    borderBottomWidth: 0.1,
    marginBottom: 30,
  },
  option: {
    elevation: 0.3,
    borderWidth: 0.1,
    width,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  optionButton: {
    padding: 7,
    height: 40,
    width: 80,
    borderRadius: 20,
    borderWidth: 0.3,

    backgroundColor: '#E3F2FD',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
