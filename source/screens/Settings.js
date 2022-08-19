import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Divider, Switch} from 'react-native-paper';

import {
  BACKGROUND_COLOR,
  b_BACKGROUND_COLOR,
  MAIN_TEXT_COLOR,
  b_MAIN_TEXT_COLOR,
} from '../utils/Constants';

export default function Settings() {
  const [isDarkSwitchOn, setIsDarkSwitchOn] = useState(false);
  const clickHandle = item => {
    console.log(item);
    if (item.id == 123) {
      setIsDarkSwitchOn(!isDarkSwitchOn);
      ToastAndroid.show(
        !isDarkSwitchOn ? 'Dark Mode On' : 'Dark Mode Off',
        ToastAndroid.SHORT,
      );
    } else if (item.id === 124) {
      ToastAndroid.show('Notifications', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(item.title, ToastAndroid.SHORT);
    }
  };

  const Items = ({item}) => (
    <View key={item.key}>
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: isDarkSwitchOn
              ? b_BACKGROUND_COLOR
              : BACKGROUND_COLOR,
          },
        ]}
        onPress={() => clickHandle(item)}>
        <Text
          style={[
            styles.title,
            {
              color: isDarkSwitchOn ? b_MAIN_TEXT_COLOR : MAIN_TEXT_COLOR,
            },
          ]}>
          {item.title}
        </Text>
        {item.hasSwitch ? (
          <Switch
            value={isDarkSwitchOn}
            onValueChange={() => setIsDarkSwitchOn(!isDarkSwitchOn)}
          />
        ) : null}
      </TouchableOpacity>

      <Divider style={{height: 2, backgroundColor: 'gray'}} />
    </View>
  );
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkSwitchOn
            ? b_BACKGROUND_COLOR
            : BACKGROUND_COLOR,
        },
      ]}>
      <FlatList
        style={{marginHorizontal: 10}}
        data={settingsData}
        renderItem={Items}
        keyExtractor={(_item, index) => index}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
  },
  switch: {
    flex: 1,
    color: 'black',
  },
});

const settingsData = [
  {
    id: 123,
    title: 'Dark Mode',
    hasSwitch: true,
  },
  {
    id: 124,
    title: 'Notifications',
    hasSwitch: false,
  },
  {
    id: 125,
    title: 'About us',
    hasSwitch: false,
  },
  {
    id: 126,
    title: 'Rate us',
    hasSwitch: false,
  },
  {
    id: 127,
    title: 'Privacy & Policies',
    hasSwitch: false,
  },
];
