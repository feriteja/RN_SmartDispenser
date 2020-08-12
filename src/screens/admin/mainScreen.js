import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';

import {withFirebase} from '../../../config/firebase/firebaseContext';
import ShowDispenser from '../../components/adminItemDispenserDisplay';

const {width, height} = Dimensions.get('screen');

function mainScreen(props) {
  const [Data, setData] = useState({});

  const dataDispenser = useSelector((state) => state.dataDispenser.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const iniData = database()
      .ref('/userDevice')
      .on('value', (snapshot) => {
        dispatch({type: 'GETDISPENSER', data: snapshot.val()});
        setData(snapshot.val());
      });

    return () => {
      database().ref('/users').off('child_added', iniData);
    };
  }, []);

  let dataPakai = Object.values(Data).reverse();
  let dataPakaiKey = Object.keys(Data).reverse();

  const CustomData = dataDispenser && Object.entries(dataDispenser).reverse();

  console.log(CustomData);

  return (
    <View style={{backgroundColor: '#fafafa', flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{paddingHorizontal: 15, marginRight: 15}}
          onPress={() => props.navigation.toggleDrawer()}>
          <IconMaterial name="menu" size={28} />
        </TouchableOpacity>
        <Text style={{fontSize: 24}}>Smart Dispenser</Text>
      </View>

      <Text style={{fontSize: 30, alignSelf: 'center', marginVertical: 50}}>
        Monitoring Admin
      </Text>

      {dataPakai && (
        <FlatList
          data={CustomData}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          columnWrapperStyle={{marginHorizontal: 10, marginVertical: 10}}
          keyExtractor={(item) => item[1].name + item[1].volume}
          renderItem={({item}) => (
            <ShowDispenser
              namaGedung={item[1].name}
              kuantitas={item[1].volume}
              origin={item[0]}
              deletePath={(thisOrigin) =>
                Alert.alert(
                  'Remove',
                  `Are you sure want to remove ${thisOrigin}  ?`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        props.firebase.doRemoveItem(thisOrigin);
                      },
                    },
                  ],
                  {cancelable: false},
                )
              }
            />
          )}
        />
      )}
    </View>
  );
}

export default withFirebase(mainScreen);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width,
    height: (height * 7) / 100,
    backgroundColor: '#4aF2FD',
    alignItems: 'center',
  },
});
