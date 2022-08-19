import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import WifiQrScreen from '../components/WifiQrScreen';
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';

export default function Result({route}) {
  const [isFirstTime, setIsFirstTime] = useState(false);

  const [data, setData] = useState({
    bounds: {
      height: 0,
      origin: [],
      width: 0,
    },
    data: '',
    rawData: '',
    target: 0,
    type: '',
  });

  const addToHistory = async mydata => {
    const listData = {
      id: shortid.generate(),
      data: mydata,
      timestamp: new Date().toLocaleString(),
    };
    // adding into history
    const storedValue = await AsyncStorage.getItem('@history_list');
    const previousList = JSON.parse(storedValue);
    if (!previousList) {
      const newList = [listData];
      await AsyncStorage.setItem('@history_list', JSON.stringify(newList));
      console.log('Added to New History...');
    } else {
      console.log('Added to History...');
      previousList.push(listData);
      await AsyncStorage.setItem('@history_list', JSON.stringify(previousList));
    }
  };

  useEffect(() => {
    const {firstTime, scannedData} = route.params;
    setData(scannedData);
    setIsFirstTime(firstTime);
    console.log(scannedData);
  }, []);

  // returning screens
  if (data.data.includes('WIFI:')) {
    if (isFirstTime) {
      // add to history
      addToHistory(data.data);
    }
    // 1. Wifi data
    return <WifiQrScreen rawData={data.data} />;
  } else if (data.data.includes('tel:')) {
    if (isFirstTime) {
      // add to history
      addToHistory(data.data);
    }
    // 2. Telephone data
    return (
      <View style={styles.container}>
        <Text style={styles.subTitle}>{data.data}</Text>
        <TouchableOpacity
          style={styles.commonButton}
          onPress={() => {
            // open phone dial with data tel no
            Linking.openURL(`tel:${data.data}`);
          }}>
          <Text>Call {data.data}</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (data.data.includes('http') || data.data.includes('www.')) {
    if (isFirstTime) {
      // add to history
      addToHistory(data.data);
    }
    // 3. Url or Website data
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            // copy url in clipboard
            Clipboard.setString(data.data);
            ToastAndroid.show('Copied!', ToastAndroid.SHORT);
          }}
          style={styles.subTitle}>
          {data.data}
        </Text>
        <TouchableOpacity
          style={styles.commonButton}
          onPress={() => {
            // open url in default browser
            Linking.openURL(data.data).catch(err => {
              console.error('Failed opening page because: ', err);
              alert('Failed to open page');
            });
          }}>
          <Text>Open in Browser</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (
    data.data.toLowerCase().includes('mailto') &&
    data.data.includes('@')
  ) {
    if (isFirstTime) {
      // add to history
      addToHistory(data.data);
    }
    // 4. Email address
    return (
      <View style={styles.container}>
        <Text style={styles.subTitle}>{data.data}</Text>
        <TouchableOpacity
          style={styles.commonButton}
          onPress={() => {
            // copy url in clipboard
            Clipboard.setString(data.data);
            ToastAndroid.show('Copied!', ToastAndroid.SHORT);
          }}>
          <Text>Copy</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    if (isFirstTime) {
      // add to history
      addToHistory(data.data);
    }
    // 4. Anything else
    return (
      <View style={styles.container}>
        <Text style={styles.subTitle}>{data.data}</Text>
        <TouchableOpacity
          style={styles.commonButton}
          onPress={() => {
            // any type of data
          }}>
          <Text>Copy</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  commonButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    elevation: 10,
    marginHorizontal: 10,
    marginTop: 20,
    padding: 10,
  },
});
