import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      handleBarCodeScanned(result.uri);
    }
  };

  const handleBarCodeScanned = (uri) => {
    // Simulating QR code scan from an uploaded image
    setData(uri); // This should decode the QR code and set the data
  };

  return (
    <View style={styles.container}>
      <Button title="Upload Image" onPress={pickImage} />
      {image && <Text style={styles.result}>Scanned Data: {data}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});
