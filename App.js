import React, { useState, useRef } from 'react';
import { 
  View,  Text, TouchableOpacity, Image, StyleSheet, Modal, FlatList, Share} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { path } from 'expo-file-system';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#486FF2'); // Default color is yellow
  const [activeTab, setActiveTab] = useState('home');
  const [qrCode, setQRCode] = useState('MemoriesQRCode');
  const qrCodeRef = useRef();
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  const predefinedColors = [
  // Primary Colors
'#FFEFEF', // Very Light Red
'#FFCCCC', // Light Red
'#FF9999', // Pale Red
'#FF6666', // Soft Red
'#FF3333', // Red (Base Color)
'#FF0000', // Bright Red
'#CC0000', // Dark Red
'#990000', // Very Dark Red
'#660000', // Almost Maroon
'#330000',  // Deep Red


'#E0F0FF', // Very Light Blue
'#C0E0FF', // Light Blue
'#A0D0FF', // Pale Blue
'#80BFFF', // Soft Blue
'#60AFFF', // Sky Blue
'#4080FF', // Blue (Base Color)
'#0040FF', // Bright Blue
'#0033CC', // Dark Blue
'#002299', // Very Dark Blue
'#001466',  // Deep Blue


'#FFFFF0', // Extremely Light Yellow
'#FFFFE0', // Very Light Yellow
'#FFFFCC', // Light Yellow
'#FFFF99', // Pale Yellow
'#FFFF66', // Soft Yellow
'#FFFF33', // Light Yellow
'#FFFF00', // Yellow (Base Color)
'#CCCC00', // Dark Yellow
'#999900', // Very Dark Yellow
'#666600',  // Almost Brown

// Secondary Colors
'#E6F9E6', // Very Light Green
'#C9F2C9', // Light Green
'#A3E0A3', // Pale Green
'#7CD77C', // Soft Green
'#4FD04F', // Light Green
'#00FF00', // Green (Base Color)
'#00CC00', // Bright Green
'#009900', // Dark Green
'#006600', // Very Dark Green
'#003300',  // Deep Green

'#FFEFE0', // Very Light Orange
'#FFD9B3', // Light Orange
'#FFC299', // Pale Orange
'#FF9C66', // Soft Orange
'#FF7F33', // Orange (Base Color)
'#FF6600', // Bright Orange
'#CC5200', // Dark Orange
'#993D00', // Very Dark Orange
'#663300', // Almost Brown
'#331A00',  // Deep Orange

'#F2E6FF', // Very Light Violet
'#E0B3FF', // Light Violet
'#D699FF', // Pale Violet
'#B980FF', // Soft Violet
'#A64DFF', // Violet (Base Color)
'#9A2EFF', // Bright Violet
'#7A00CC', // Dark Violet
'#5D00A3', // Very Dark Violet
'#3F007F', // Almost Purple
'#20004D',  // Deep Violet








  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const toggleColorPicker = () => {
    setIsColorPickerVisible(!isColorPickerVisible);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setIsColorPickerVisible(false);
  };

  const generateQRCode = () => {
    setQRCode(selectedImage);
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MemoriesQRCode</Text>
      </View>
<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Select Photo and Color Picker */}
      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <FontAwesome name="folder" size={24} color="white" />
          <Text style={styles.buttonText}>Select Photo</Text>
        </TouchableOpacity>

        
      </View>

      {/* "This is the color" Text */}
      

      {/* Image and QR Code */}
      <View style={styles.imageContainer}>
      <View >
        <View style={styles.imgBox}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <FontAwesome name="image" size={24} color="gray" />
          )}
        </View>
      </View>

      {/* Color Picker */}
      <View style={styles.colorPickerContainer}>
        <Text style={{marginRight: 8, fontSize: 16}}>Select Color</Text>
          <TouchableOpacity 
            style={[styles.colorCircle, { backgroundColor: selectedColor }]} 
            onPress={toggleColorPicker}
          />
          {isColorPickerVisible && (
            <View style={styles.colorOptions}>
              <FlatList
                data={predefinedColors}
                keyExtractor={(item) => item}
                numColumns={10}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[styles.colorOption, { backgroundColor: item }]} 
                    onPress={() => handleColorSelect(item)}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>

        
      <View style={styles.qrCodeContainer}>
      {qrCode && (
        
          <QRCode
            value={qrCode}
            size={310}
            color={selectedColor}
            getRef={qrCodeRef}
          />)}
        </View>
      {/* QR Code and Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={generateQRCode}>
          <Text style={styles.actionButtonText}>Generate QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={saveQRCode}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={shareQRCode}>
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      </View>

      {/* Bottom Navigation */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'home' && styles.activeTab]}
          onPress={() => setActiveTab('home')}
        >
          <FontAwesome name="home" size={30} color="white" />
          {activeTab === 'home' && <View style={styles.activeLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'scan' && styles.activeTab]}
          onPress={() => setActiveTab('scan')}
        >
          <FontAwesome name="qrcode" size={30} color="white" />
          {activeTab === 'scan' && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#486FF2',
    width: '100%',
    height: 80,
    paddingVertical: 10,
    alignItems: 'left',
    justifyContent: 'center',
    paddingLeft: 8
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#486FF2',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    width: '100%'
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  colorPickerContainer: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 5, // Make it circular
    borderWidth: 5,
    borderColor: '#486FF2',
  },
  colorOptions: {
    position: 'absolute',
    top: 50,
    right: 5,
    width: 'auto',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  colorOption: {
    width: 30,
    height: 30,
    margin: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  colorText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
    zIndex:1,
  },
  imgBox: {
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  boxText: {
    fontSize: 18,
    color: '#777',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  qrCodeContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#486FF2',
    padding: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#486FF2',
    width: '90%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
    borderRadius: 50,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  
  activeLine: {
    marginTop: 4,
    height: 5,
    backgroundColor: '#00ff00',
    width: '30%',
    borderRadius: 10,
  },
});
