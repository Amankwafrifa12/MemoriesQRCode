import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ColorPicker } from 'react-native-color-picker';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#FFFF00'); // Default color is yellow
  const [activeTab, setActiveTab] = useState('home');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MemoriesQRCode</Text>

      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <Text style={styles.boxText}>IMG</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, { backgroundColor: selectedColor }]}>
          <ColorPicker
            onColorSelected={(color) => setSelectedColor(color)}
            style={{ flex: 1 }}
            hideSliders={true}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[styles.navButton, activeTab === 'home' && styles.activeTab]}
          onPress={() => setActiveTab('home')}
        >
          <FontAwesome name="home" size={24} color="black" />
          <View style={activeTab === 'home' ? styles.activeLine : null} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'gallery' && styles.activeTab]}
          onPress={() => setActiveTab('gallery')}
        >
          <FontAwesome name="image" size={24} color="black" />
          <View style={activeTab === 'gallery' ? styles.activeLine : null} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <FontAwesome name="cog" size={24} color="black" />
          <View style={activeTab === 'settings' ? styles.activeLine : null} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    width: '48%',
    height: 150,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    fontSize: 18,
    color: '#777',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
  },
  activeTab: {
    backgroundColor: '#E0E0E0',
  },
  activeLine: {
    marginTop: 4,
    height: 2,
    backgroundColor: 'green',
    width: '100%',
  },
});
