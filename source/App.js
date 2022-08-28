import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Alert,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

// All Screens
import Home from '../source/screens/Home';
import Result from '../source/screens/Result';
import History from '../source/screens/History';
import Settings from '../source/screens/Settings';
import GenerateQr from '../source/screens/GenerateQr';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyBottomTabs() {
  const [historyList, setHistoryList] = useState([{}]);
  const path = RNFS.DownloadDirectoryPath + '/scannerQr.txt';

  const downloadFileData = async () => {
    try {
      AsyncStorage.getItem('@history_list')
        .then(storedValue => {
          if (!storedValue) {
            setHistoryList([]);
          }
          const list = JSON.parse(storedValue);
          setHistoryList(list);
        })
        .catch(err => {
          // Stop loading
          console.log('Error Loading' + err.message);
        });

      if (historyList != null && historyList.length > 0) {
        await RNFS.writeFile(
          path,
          {
            title: 'ScannerQr Backup File',
            data: historyList,
            date: new Date().toLocaleDateString(),
          },
          'utf8',
        );
        alert('Successfully completed. Please check your Downloads folder.');
      } else {
        alert('There is nothing to save');
      }
      console.log('Success!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerTitle: 'ScannerQr',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          // backgroundColor: '#03a9f4',
          backgroundColor: 'white',
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'download' : 'download-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size + 5} color={color} />;
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 55,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Alert',
                    "Just chill bro!\nWe're adding features.",
                  );
                }}
                style={styles.appbarButton}>
                <Ionicons
                  name="md-ellipsis-vertical"
                  color={'black'}
                  size={20}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerTitle: 'History',
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
                {/* Download json file */}
                <TouchableOpacity
                  style={styles.appbarButton}
                  onPress={() => {
                    Alert.alert(
                      'Download the backup json file?',
                      'A json file will be saved in to your downloads folder.',
                      [
                        {text: 'No'},
                        {
                          text: 'Yes',
                          onPress: () => {
                            console.log('Save json file in downloads');
                            downloadFileData();
                          },
                        },
                      ],
                    );
                  }}>
                  <Ionicons name="download-outline" size={25} color="black" />
                </TouchableOpacity>

                {/* Delete all */}
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Delete all records?',
                      'All items will be lost.',
                      [
                        {text: 'No'},
                        {
                          text: 'Yes',
                          onPress: () => {
                            AsyncStorage.getAllKeys()
                              .then(keys => AsyncStorage.multiRemove(keys))
                              .then(() => alert('success'));
                          },
                        },
                      ],
                    );
                  }}
                  style={styles.appbarButton}>
                  <Ionicons
                    name="ios-trash-bin-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar barStyle="light-content" backgroundColor="#007ac1" /> */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator>
        <Stack.Screen
          name="MyBottomTabs"
          component={MyBottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Result"
          options={{
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
          component={Result}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GenerateQr" component={GenerateQr} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appbarButton: {
    marginRight: 16,
  },
});
