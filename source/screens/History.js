import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import randomColor from 'randomcolor';

export default function History({navigation}) {
  const firstTime = false;
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [historyList, setHistoryList] = useState([]);

  const getScannedHistory = () => {
    // Start loading
    setIsLoading(true);
    // Get objects from AsyncStorage
    AsyncStorage.getItem('@history_list')
      .then(storedValue => {
        if (!storedValue) {
          setHistoryList([]);
        }
        const list = JSON.parse(storedValue);
        console.log('list=> ' + storedValue);

        setHistoryList(list);

        setIsLoading(false);
      })
      .catch(err => {
        // Stop loading
        setIsLoading(false);
        console.log('Error Loading' + err.message);
      });

    console.log('HistoryList=> ' + historyList);
  };

  useEffect(() => {
    getScannedHistory();
    console.log('HistoryList=> ' + historyList);
  }, [reload]);

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {alignContent: 'center', justifyContent: 'center'},
        ]}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  } else if (historyList === null || historyList.length <= 0) {
    return (
      <TouchableOpacity
        onPress={() => setReload(!reload)}
        style={[
          styles.container,
          {alignContent: 'center', justifyContent: 'center'},
        ]}>
        <Text style={styles.loading}>No items found{'\n'}Tap to reload</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {historyList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyItem}
              onPress={() => {
                const scannedData = item;
                navigation.navigate('Result', {firstTime, scannedData});
              }}
              onLongPress={() => {
                Alert.alert(
                  'Delete',
                  'Are you sure you wan to delete ' + item.id + ' ?',
                  [
                    {text: 'No'},
                    {
                      text: 'Yes',
                      onPress: () => {
                        AsyncStorage.getItem('@history_list').then(re => {
                          const previousList = JSON.parse(re);
                          console.log('Removed from History...');
                          previousList.pop(item);
                          AsyncStorage.setItem(
                            '@history_list',
                            JSON.stringify(previousList),
                          )
                            .then(_r => {
                              setReload(!reload);
                              ToastAndroid.show(
                                'Successful',
                                ToastAndroid.SHORT,
                              );
                            })
                            .catch(err => {
                              ToastAndroid.show(
                                'Failed: ' + err,
                                ToastAndroid.SHORT,
                              );
                            });
                        });
                      },
                    },
                  ],
                );
              }}>
              <Text>Id: {item.id}</Text>
              <Text>{item.timestamp}</Text>
              <Text>{item.data}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loading: {
    fontSize: 18,
    width: '100%',
    color: 'black',
    textAlign: 'center',
  },
  historyItem: {
    marginHorizontal: 10,
    margin: 5,
    padding: 10,
    // backgroundColor: randomColor({hue: 'blue', luminosity: 'light'}),#db3c30
    backgroundColor: '#db3c30',
    borderRadius: 5,
    elevation: 5,
  },
});
