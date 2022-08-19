import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Avatar} from 'react-native-paper';

export default function MyQr({navigation}) {
  const [walletId, setWalletId] = useState('+9779845852024');

  return (
    <View style={styles.container}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            width: '100%',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Scan to pay {walletId}
        </Text>
      </View>

      <View
        style={{
          padding: 15,
          backgroundColor: 'white',
          borderRadius: 5,
          elevation: 10,
          alignSelf: 'center',
        }}>
        <QRCode
          value={'nsrmt:' + walletId}
          size={220}
          logoBackgroundColor="transparent"
        />
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
        <Text
          style={{
            fontSize: 22,
            width: '100%',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'gray',
          }}>
          Kishan Kumar Sharma
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          alignItems: 'center',
          margin: 20,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => {
            console.log('Download this yo...');
          }}>
          <Avatar.Icon
            icon="download"
            size={50}
            color="purple"
            style={{backgroundColor: 'gray'}}
          />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTouchable}
          onPress={() => {
            console.log('Share this yo...');
          }}>
          <Avatar.Icon
            icon="share"
            size={50}
            color="purple"
            style={{backgroundColor: 'gray'}}
          />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  buttonText: {
    color: 'pink',
    width: 50,
    textAlign: 'center',
    fontWeight: '900',
  },
  buttonTouchable: {
    padding: 5,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
