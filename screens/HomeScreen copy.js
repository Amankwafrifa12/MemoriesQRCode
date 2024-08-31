import React, { useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Share, TextInput, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
   import { path } from 'expo-file-system';

export default function HomeScreen() {
  const [image, setImage] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [text, setText] = useState(''); // Initialize TextInput state
  const qrCodeRef = useRef();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.image,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setQRCode(null); // Reset QR code when a new image is picked
      
        setText('Image Selected');
      
    }
  };

  const generateQRCode = () => {
    setQRCode(image);
  };

  const saveQRCode = async () => {
    qrCodeRef.current?.toDataURL(async (data) => {
      const fileUri = `${FileSystem.cacheDirectory}QRCode.png`;
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync('QRCode', asset, false);
      alert('QR Code saved to your gallery!');
    });
  };

  const shareQRCode = async () => {
    qrCodeRef.current?.toDataURL(async (data) => {
      const fileUri = `${FileSystem.cacheDirectory}QRCode.png`;
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });
      
      await Share.share({
        message: 'This image QrCode was generated with MemoriesQRCode. Get it on Google Play Store.',
        url: fileUri,
        title: 'Share QR Code'
      }, {
        dialogTitle: 'Share QR Code',
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5}}>
      <TextInput value={text} onChangeText={(text) => setText(text)} style={{ margin: 10, borderWidth: 1, padding: 10, width:'70%', borderRadius:10, borderColor:'gray' }}
      />
      <TouchableOpacity style={{borderWidth: 1,width: 300, height: 300, margin: 10, alignItems: 'center', justifyContent: 'center'}}>
        {image && <Image source={{ uri: image }} style={styles.image} /> }</TouchableOpacity>
      
      <Button title='Select Image' onPress={pickImage} style={{width: 200}} /> 
      </View>
      

      {image && !qrCode && (
        <TouchableOpacity onPress={generateQRCode} style={{backgroundColor: 'red'}}><Text>Generate</Text></TouchableOpacity>
      )}
      
      {qrCode && (
        <>
          <QRCode
            value={qrCode}
            size={200}
            color={'green'}
            getRef={qrCodeRef}
          />
          <View style={{flexDirection: 'row', justifyContent: '', padding: 5, margin: 5}}>
          <TouchableOpacity onPress={saveQRCode} style={styles.saveButton} ><Text>Save</Text></TouchableOpacity>
          <TouchableOpacity onPress={shareQRCode} style={styles.saveButton} ><Text>Share</Text></TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  saveButton: {backgroundColor: 'red', 
    margin: 10, 
    height: 30, 
    width: 40, 
    justifyContent:'center', 
    alignItems: 'center', 
    borderRadius: 10}
});
