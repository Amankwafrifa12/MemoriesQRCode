import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function QRCodeGenerator() {
  const [inputValue, setInputValue] = useState('');
  const [qrSize, setQRSize] = useState(200);
  const [qrCodeValue, setQRCodeValue] = useState(null);
  const qrCodeRef = useRef();

  const generateQRCode = () => {
    setQRCodeValue(inputValue);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Code Generator</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter URL or Text"
        value={inputValue}
        onChangeText={setInputValue}
      />
      
      

      {qrCodeValue && (
        <QRCode
          value={qrCodeValue}
          size={qrSize}
          getRef={qrCodeRef}
        />
      )}
      
      <View style={styles.buttonContainer}>
        <Button title="Generate QR Code" onPress={generateQRCode} color="#5D5FEF" />
        <Button title="Save" onPress={saveQRCode} color="#2C6BED" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
