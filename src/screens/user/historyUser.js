import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import {withFirebase} from '../../../config/firebase/firebaseContext';
import {useSelector} from 'react-redux';
import ItemTabel from '../../components/itemTabelHeader';
import {notifMan} from '../../../config/Notification/NotificationManager';

function historyUser(props) {
  const [NotificationTime, setNotificationTime] = useState(true);
  const dataHistory = useSelector((state) => state.historyReducer.data);

  dataHistory && dataHistory.sort((a, b) => (a.time < b.time ? 1 : -1));

  console.log(dataHistory);

  const dataUsage = dataHistory && dataHistory.map((a) => a.waterUsage);

  const todayTime = new Date();
  todayTime.setHours(0);
  todayTime.setMinutes(0);
  todayTime.setSeconds(0);

  const getTodayTimeMilis = todayTime.getTime();

  const getUnixTIme = Math.floor(getTodayTimeMilis / 1000);

  const dataUsageToday =
    dataHistory &&
    dataHistory.filter((a) => {
      return a.time >= getUnixTIme;
    });

  const dataUsageTodayConsumed =
    dataHistory && dataUsageToday.map((a) => a.waterUsage);

  const sumUsageToday =
    dataHistory &&
    dataUsageTodayConsumed.reduce((a, b) => {
      return a + b;
    }, 0);

  console.log(sumUsageToday);

  const sumDataUsage =
    dataHistory &&
    dataUsage.reduce((a, b) => {
      return a + b;
    }, 0);

  useEffect(() => {
    const getTime = setInterval(() => {
      const timeEff = new Date();

      if (
        timeEff.getHours() === 17 &&
        sumDataUsage <= 2000 &&
        NotificationTime === true
      ) {
        notifMan.buildNotification(
          3,
          'Segera Minum',
          'Anda minum kurang dari 2L hari ini',
          'Peringatan',
        );
        setNotificationTime(false);
      } else {
        // setNotificationTime(true);
      }
    }, 1000);
    return () => {
      clearInterval(getTime);
    };
  }, [NotificationTime]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={{fontSize: 16, alignSelf: 'center'}}>
          History USER: {props.firebase.auth.currentUser.email}
        </Text>
      </View>
      <View style={{alignSelf: 'flex-end', marginRight: 10}}>
        <Text style={{fontSize: 18}}>
          Today Consumed:
          <Text style={{fontWeight: 'bold'}}> {sumUsageToday} mL</Text>
        </Text>
      </View>
      <View style={{alignSelf: 'flex-end', marginRight: 10}}>
        <Text style={{fontSize: 18}}>
          Total Consumed:
          <Text style={{fontWeight: 'bold'}}> {sumDataUsage} mL</Text>
        </Text>
      </View>
      <View style={styles.tabelHeader}>
        <Text style={styles.textTabelHeader}>Date</Text>
        <Text style={styles.textTabelHeader}>Consumed</Text>
      </View>
      <FlatList
        scrollEnabled={true}
        data={dataHistory}
        renderItem={({item}) => (
          <ItemTabel tanggal={item.time} consumed={item.waterUsage} />
        )}
        keyExtractor={(item) => item.time.toString()}
      />
    </View>
  );
}

export default withFirebase(historyUser);

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    elevation: 0.6,
    borderBottomWidth: 0.1,
    marginBottom: 30,
  },

  tabelHeader: {
    paddingHorizontal: 0,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 0.9,
    borderBottomWidth: 0.3,
  },
  textTabelHeader: {
    fontSize: 20,
  },
});
