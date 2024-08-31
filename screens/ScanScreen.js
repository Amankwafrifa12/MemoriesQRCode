import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function ScanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Scan with Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Upload Image"
        onPress={() => navigation.navigate('Upload')}
      />
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
});
