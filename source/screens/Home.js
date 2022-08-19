import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Vibration,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Avatar} from 'react-native-paper';

// constants
import {
  BACKGROUND_COLOR,
  FOREGROUND_COLOR,
  ICON_BACKGROUND_COLOR,
  ICON_COLOR,
  MAIN_TEXT_COLOR,
} from '../utils/Constants';

const Home = ({navigation}) => {
  const firstTime = true;
  const [isFlashOn, setIsFlashOn] = useState(false);

  const onSuccess = scannedData => {
    if (scannedData.data != null && firstTime) {
      Vibration.vibrate();
      navigation.navigate('Result', {firstTime, scannedData});
    } else {
      Vibration.cancel();
      ToastAndroid.show("Can't read this QR", ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={3000}
        cameraStyle={{width: 280, height: 400, alignSelf: 'center'}}
        onRead={onSuccess}
        flashMode={
          isFlashOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        topContent={
          <View style={styles.cardHolder}>
            <Image
              width={10}
              height={10}
              source={require('../assets/cards/card_imepay.png')}
              style={styles.cards}
            />
            <Image
              width={10}
              height={10}
              source={require('../assets/cards/card_master.png')}
              style={styles.cards}
            />
          </View>
        }
        bottomContent={
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                setIsFlashOn(!isFlashOn);
              }}>
              <Avatar.Icon
                icon={isFlashOn ? 'flashlight' : 'flashlight-off'}
                size={50}
                color={BACKGROUND_COLOR}
                style={{
                  backgroundColor: isFlashOn
                    ? ICON_BACKGROUND_COLOR
                    : ICON_COLOR,
                }}
              />
              <Text style={styles.buttonText}>{isFlashOn ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                ToastAndroid.show('Comming soon!', ToastAndroid.SHORT);
              }}>
              <Avatar.Icon
                icon="qrcode-scan"
                size={50}
                color={BACKGROUND_COLOR}
                style={{backgroundColor: ICON_COLOR}}
              />
              <Text style={styles.buttonText}>MY QR CODE</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    width: 60,
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  cardHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: MAIN_TEXT_COLOR,
  },
  buttonText: {
    color: FOREGROUND_COLOR,
    width: 150,
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
