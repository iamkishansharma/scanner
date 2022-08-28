import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Avatar, TextInput} from 'react-native-paper';
import { BACKGROUND_COLOR, ICON_COLOR } from '../utils/Constants';

export default function GenerateQr({navigation}) {
  const [generate, setGenerate] = useState('');
  const [textInput, setTextInput] = useState('');

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          flexDirection:'row'
        }}>
        {/* <Text
          style={{
            color: 'gray',
            fontSize: 16,
            width: '100%',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Scan to pay {walletId}
        </Text> */}

        <TextInput
          value={textInput}
          onChangeText={text => setTextInput(text)}
          returnKeyType="done"
          maxFontSizeMultiplier={4}
          mode="outlined"
          style={{margin: 5, flex: 1, width: '100%', backgroundColor: 'white'}}
          placeholder="Write anything to create qr"
        />
        <TouchableOpacity onPress={()=>{
          setGenerate("")
          setTimeout(() => {
            setGenerate(textInput)
            setTextInput("")
          }, 1000);
        }}
        style={{backgroundColor:'red',padding:2, borderRadius:100}}>
          <Avatar.Icon
                icon="arrow-right"
                size={45}
                color={BACKGROUND_COLOR}
                style={{backgroundColor: 'black'}}
              />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: 'white',
          borderRadius: 5,
          elevation: 10,
          alignSelf: 'center',
        }}>
        {generate ? (
          <QRCode
            value={generate}
            size={220}
            logoBackgroundColor="transparent"
          />
        ) :  textInput? (
          <Text>Generating...</Text>
        ):(
          <Text>Can not generate.</Text>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
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
            color="white"
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
            color="white"
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
