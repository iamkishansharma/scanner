import React, {useEffect, useState} from 'react';
import {
  Text,
  ToastAndroid,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {Divider} from 'react-native-paper';

export default function WifiQrScreen({rawData}) {
  const [wifiType, setWifiType] = useState('');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');

  useEffect(() => {
    // extracting wifi type
    const newData = rawData.replace('WIFI:', '');
    const data = newData.split(';');
    console.log('===========' + data);
    data.forEach(item => {
      if (item.includes('T:')) {
        setWifiType(item.replace('T:', ''));
      }
      if (item.includes('S:')) {
        setWifiSsid(item.replace('S:', ''));
      }
      if (item.includes('P:')) {
        setWifiPassword(item.replace('P:', ''));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WiFi Type: {wifiType}</Text>
      <View style={styles.subContainer}>
        <Text style={styles.title}>SSID:</Text>
        <Divider style={styles.divider} />
      </View>
      <Text style={styles.subTitle}>{wifiSsid}</Text>

      <View style={styles.subContainer}>
        <Text style={styles.title}>Password:</Text>
        <Divider style={styles.divider} />
      </View>
      <Text style={styles.subTitle}>{wifiPassword}</Text>

      <TouchableOpacity
        style={styles.copyButton}
        onPress={() => {
          if (wifiPassword !== null && wifiPassword.length !== 0) {
            Clipboard.setString(wifiPassword);
            ToastAndroid.show('Password copied!', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Not a valid password.', ToastAndroid.SHORT);
          }
        }}>
        <Text style={styles.buttonText}>Copy Password</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  divider: {height: 2, marginStart: 5, flex: 1, backgroundColor: 'black'},
  title: {
    color: 'black',
    fontSize: 20,
  },
  subTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
  },
  copyButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    elevation: 10,
    marginHorizontal: 10,
    marginTop: 20,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
